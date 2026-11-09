import { readdir, readFile, realpath, lstat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { containedPath, parseConfig, readConfigText } from './config.js';
import { indexEntries } from './index-entries.js';
import { parseTokens } from './tokens.js';
import { publicExports } from './exports.js';
import { parseCssVariables } from './css-variables.js';
import {
  isRecord,
  message,
  type Dependency,
  type Diagnostic,
  type Snapshot,
  type SourceConfig,
  type SourceFile,
} from './types.js';

const sourcePattern = /\.(mdx?|[cm]?[jt]sx?|css|json)$/;
const licensePattern = /(?:^|\/)(?:LICENSE|LICENCE|NOTICE)[^/]*$/i;
// ESM declarations only: the CommonJS `.d.cts` copies would duplicate every search hit.
// CSS is plain text and carries component variables such as `--dsc-table-padding`.
const declarationPattern = /\.d\.m?ts$|\.css$/;
const dependencyExtraPattern = /(?:^|\/)(?:package\.json|README[^/]*)$/i;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

interface Candidate {
  path: string;
  absolute: string;
  signature: string;
}
interface Sweep {
  candidates: Candidate[];
  diagnostics: Diagnostic[];
  dependencies: Dependency[];
}

// One cached snapshot per checkout. A cheap stat sweep runs on every request; the files are
// only reread and reparsed when a size, timestamp or inode changed, so edits stay visible.
const previous = new Map<string, { signature: string; snapshot: Snapshot }>();
const inflight = new Map<string, Promise<Snapshot>>();

export async function readLocalSources(repositoryRoot: string): Promise<Snapshot> {
  const root = await realpath(repositoryRoot);
  const pending = inflight.get(root);
  if (pending) return pending;
  const loading = load(root).finally(() => inflight.delete(root));
  inflight.set(root, loading);
  return loading;
}

async function load(root: string): Promise<Snapshot> {
  const configText = await readConfigText(root);
  const config = parseConfig(configText);
  const sweep = await sweepFiles(root, config);
  const signature = createHash('sha256')
    .update(configText)
    .update('\0')
    .update(sweep.candidates.map((item) => `${item.path}\0${item.signature}`).join('\n'))
    // Skipped links and missing roots change these without changing the candidate files.
    .update(JSON.stringify([sweep.diagnostics, sweep.dependencies]))
    .digest('hex');
  const cached = previous.get(root);
  if (cached && cached.signature === signature) return cached.snapshot;
  const snapshot = await build(root, config, sweep);
  previous.set(root, { signature, snapshot });
  return snapshot;
}

function packageNameFromPath(path: string): string {
  const parts = path.split('/');
  const scope = parts.at(-2);
  return scope?.startsWith('@') ? `${scope}/${parts.at(-1) ?? ''}` : (parts.at(-1) ?? path);
}

async function sweepFiles(root: string, config: SourceConfig): Promise<Sweep> {
  const candidates: Candidate[] = [];
  const diagnostics: Diagnostic[] = [];
  const dependencies: Dependency[] = [];
  const visited = new Set<string>();
  // Roots are canonicalised and checked against the checkout once; entries below a canonical
  // directory are canonical too unless they are symbolic links, which are skipped.
  async function visit(
    path: string,
    accept: (path: string) => boolean,
    followRootLink = false,
  ): Promise<void> {
    if (visited.has(path)) return;
    visited.add(path);
    try {
      const linkStat = await lstat(resolve(root, path));
      if (linkStat.isSymbolicLink() && !followRootLink) {
        diagnostics.push({ path, message: 'Symbolic link skipped.' });
        return;
      }
      const absolute = await containedPath(root, path);
      const stat = linkStat.isSymbolicLink() ? await lstat(absolute) : linkStat;
      if (stat.isDirectory()) await visitDirectory(path, absolute, accept);
      else if (stat.isFile()) addFile(path, absolute, stat.size, stat, accept);
    } catch (error) {
      // Missing optional roots and files edited/deleted during a scan must not break unrelated docs.
      diagnostics.push({ path, message: message(error) });
    }
  }
  async function visitDirectory(
    path: string,
    absolute: string,
    accept: (path: string) => boolean,
  ): Promise<void> {
    const entries = (await readdir(absolute, { withFileTypes: true })).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      const childPath = `${path}/${entry.name}`;
      const childAbsolute = join(absolute, entry.name);
      if (visited.has(childPath)) continue;
      visited.add(childPath);
      try {
        if (entry.isSymbolicLink()) {
          diagnostics.push({ path: childPath, message: 'Symbolic link skipped.' });
        } else if (entry.isDirectory()) {
          await visitDirectory(childPath, childAbsolute, accept);
        } else if (entry.isFile() && accept(childPath)) {
          const stat = await lstat(childAbsolute);
          addFile(childPath, childAbsolute, stat.size, stat, accept);
        }
      } catch (error) {
        diagnostics.push({ path: childPath, message: message(error) });
      }
    }
  }
  function addFile(
    path: string,
    absolute: string,
    size: number,
    stat: { mtimeMs: number; ctimeMs: number; ino: number },
    accept: (path: string) => boolean,
  ): void {
    if (!accept(path)) return;
    if (size > MAX_FILE_SIZE) {
      diagnostics.push({ path, message: 'Skipped file larger than 4 MiB.' });
      return;
    }
    candidates.push({
      path,
      absolute,
      signature: `${size}:${stat.mtimeMs}:${stat.ctimeMs}:${stat.ino}`,
    });
  }
  const acceptSource = (path: string): boolean =>
    sourcePattern.test(path) || licensePattern.test(path);
  for (const path of [...config.sourceRoots, ...config.additionalFiles])
    await visit(path, acceptSource);
  // Installed dependencies are optional: package managers link them, so the root itself may be a
  // symbolic link, but it must still resolve inside the checkout. Only declarations are indexed.
  const acceptDeclaration = (path: string): boolean =>
    declarationPattern.test(path) || dependencyExtraPattern.test(path) || licensePattern.test(path);
  for (const path of config.dependencyRoots) {
    const dependency: Dependency = {
      root: path,
      package: packageNameFromPath(path),
      files: 0,
      indexed: false,
    };
    try {
      const absolute = await containedPath(root, path);
      // The root may be a folder inside the package, such as `dist/src`.
      for (const folder of [absolute, resolve(absolute, '..'), resolve(absolute, '../..')]) {
        try {
          const pkg: unknown = JSON.parse(await readFile(resolve(folder, 'package.json'), 'utf8'));
          if (isRecord(pkg) && typeof pkg.name === 'string') {
            dependency.package = pkg.name;
            if (typeof pkg.version === 'string') dependency.version = pkg.version;
            break;
          }
        } catch {
          // A dependency without package metadata is still indexed by folder name.
        }
      }
      const before = candidates.length;
      await visit(path, acceptDeclaration, true);
      dependency.files = candidates.length - before;
      dependency.indexed = dependency.files > 0;
      if (!dependency.indexed)
        dependency.note = 'No type declarations or CSS found under this folder.';
    } catch (error) {
      dependency.note =
        error instanceof Error && 'code' in error && error.code === 'ENOENT'
          ? 'Not installed. Install workspace dependencies (pnpm install) to index its type declarations.'
          : message(error);
    }
    dependencies.push(dependency);
  }
  return { candidates, diagnostics, dependencies };
}

async function build(root: string, config: SourceConfig, sweep: Sweep): Promise<Snapshot> {
  const diagnostics = [...sweep.diagnostics];
  const files: Record<string, SourceFile> = Object.create(null) as Record<string, SourceFile>;
  for (const candidate of sweep.candidates) {
    try {
      const content = await readFile(candidate.absolute, 'utf8');
      files[candidate.path] = {
        content,
        url: pathToFileURL(candidate.absolute).href,
        sha256: createHash('sha256').update(content).digest('hex'),
      };
    } catch (error) {
      diagnostics.push({ path: candidate.path, message: message(error) });
    }
  }
  const ordered = Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)));
  const entries = indexEntries(ordered, config, diagnostics);
  const tokens = parseTokens(ordered, config.tokenRoots, diagnostics);
  const exports = publicExports(ordered, config, diagnostics);
  const cssVariables = parseCssVariables(ordered);
  if (!entries.some((entry) => entry.type === 'docs'))
    diagnostics.push({
      path: config.documentationRoot,
      message: 'No documentation indexed. Check sources.json and get_status diagnostics.',
    });
  const hash = createHash('sha256').update(JSON.stringify(config));
  for (const [path, file] of Object.entries(ordered)) hash.update(`${path}\0${file.sha256}\n`);
  return {
    entries,
    files: ordered,
    tokens,
    cssVariables,
    exports,
    dependencies: sweep.dependencies,
    config,
    metadata: {
      repositoryRoot: root,
      source: 'local-working-tree',
      indexedAt: new Date().toISOString(),
      contentSha256: hash.digest('hex'),
      documents: entries.filter((entry) => entry.type === 'docs').length,
      stories: entries.filter((entry) => entry.type === 'story').length,
      files: Object.keys(ordered).length,
      diagnostics,
      note: 'Reads local working-tree files, including uncommitted changes; the index is rebuilt whenever a file changes. No network. Static metadata is best-effort; inspect diagnostics. Storybook URLs are inferred from story IDs and are not checked against the site. Dependency props come from installed type declarations; without pnpm install in the repository root they are missing, and dependencies says which.',
    },
  };
}
