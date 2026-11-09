import { build, type Plugin, type BuildResult } from 'esbuild';
import ts from 'typescript';
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const checking = process.argv.includes('--check');
const hash = (value: string | Uint8Array): string =>
  createHash('sha256').update(value).digest('hex');
const config = ts.readConfigFile(resolve(root, 'tsconfig.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const errors = [
  ...(config.error ? [config.error] : []),
  ...parsed.errors,
  ...ts.getPreEmitDiagnostics(program),
];
if (errors.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(errors, {
      getCanonicalFileName: (path) => path,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }),
  );
  throw new Error('Type-check failed; existing bundles were not changed.');
}

const outputs = new Map<string, Uint8Array>();
const dependencies = new Set<string>();
const runtimeImport: Plugin = {
  name: 'use-offline-runtime',
  setup(builder) {
    builder.onResolve(
      { filter: /(?:^\.\/server|^\.\.\/src\/(?:catalog|server|runtime))\.js$/ },
      (args) => ({
        // The specifier, unlike the importer path, uses `/` on every platform.
        path: args.path.startsWith('../src/') ? '../runtime.mjs' : './runtime.mjs',
        external: true,
      }),
    );
  },
};
const banner =
  '// Generated from TypeScript by scripts/build.mjs. Do not edit. See THIRD_PARTY_NOTICES.txt.\nimport { createRequire as __createRequire } from "node:module";\nconst require = __createRequire(import.meta.url);\nconst __filename = require("node:url").fileURLToPath(import.meta.url);\nconst __dirname = require("node:path").dirname(__filename);';
async function bundle(entry: string, outfile: string, shared = false): Promise<void> {
  const result: BuildResult = await build({
    absWorkingDir: root,
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    minify: outfile === 'runtime.mjs',
    legalComments: 'eof',
    metafile: true,
    write: false,
    banner: { js: banner },
    plugins: shared ? [runtimeImport] : [],
  });
  for (const output of result.outputFiles ?? [])
    outputs.set(relative(root, output.path), output.contents);
  for (const path of Object.keys(result.metafile?.inputs ?? {}))
    if (path.includes('node_modules/')) dependencies.add(path);
}
await bundle('src/runtime.ts', 'runtime.mjs');
await bundle('src/start.ts', 'start.mjs', true);
for (const name of (await readdir(resolve(root, 'test'))).sort()) {
  if (name.endsWith('.test.ts') || name === 'deny-network.ts')
    await bundle(`test/${name}`, `test/${name.replace(/\.ts$/, '.mjs')}`, true);
}

const packages = new Map<string, { name: string; version: string; license?: string }>();
for (const path of dependencies) {
  let folder = dirname(resolve(root, path));
  while (relative(root, folder).startsWith('node_modules')) {
    try {
      const pkg: { name?: string; version?: string; license?: string } = JSON.parse(
        await readFile(resolve(folder, 'package.json'), 'utf8'),
      );
      if (pkg.name && pkg.version) {
        packages.set(folder, { name: pkg.name, version: pkg.version, license: pkg.license });
        break;
      }
    } catch (error) {
      if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
    }
    folder = dirname(folder);
  }
}
const notices: string[] = [];
for (const [folder, pkg] of [...packages].sort(([a], [b]) => a.localeCompare(b))) {
  const licenses: string[] = [];
  for (const name of [
    'LICENSE',
    'LICENSE.txt',
    'LICENSE.md',
    'LICENSE-MIT',
    'NOTICE.txt',
    'ThirdPartyNoticeText.txt',
  ]) {
    try {
      licenses.push(await readFile(resolve(folder, name), 'utf8'));
    } catch (error) {
      if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
    }
  }
  if (!licenses.length) throw new Error(`Missing license text for ${pkg.name}`);
  notices.push(
    `${pkg.name}@${pkg.version} (${pkg.license ?? 'see license'})\n\n${licenses.join('\n\n')}`,
  );
}
outputs.set(
  'THIRD_PARTY_NOTICES.txt',
  Buffer.from(notices.join('\n\n----------------------------------------\n\n')),
);

// Hash inputs and outputs so normal offline tests catch stale bundles without build tools.
const inputs: Record<string, string> = {};
async function collect(path: string): Promise<void> {
  for (const name of (await readdir(resolve(root, path), { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const child = `${path}/${name.name}`;
    if (name.isDirectory()) await collect(child);
    else if (name.name.endsWith('.ts') || child === 'scripts/build.mjs')
      inputs[child] = hash(await readFile(resolve(root, child)));
  }
}
for (const folder of ['src', 'scripts', 'test']) await collect(folder);
for (const path of ['package.json', 'package-lock.json', 'tsconfig.json'])
  inputs[path] = hash(await readFile(resolve(root, path)));
// sources.json is deliberately runtime configuration: editing paths needs no rebuild.
const manifest = {
  version: 1,
  inputs,
  outputs: Object.fromEntries([...outputs].map(([path, content]) => [path, hash(content)])),
};
outputs.set('build-manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'));

const stale: string[] = [];
for (const [path, content] of outputs) {
  if (checking) {
    try {
      if (hash(await readFile(resolve(root, path))) !== hash(content)) stale.push(path);
    } catch {
      stale.push(path);
    }
  } else {
    await mkdir(dirname(resolve(root, path)), { recursive: true });
    await writeFile(resolve(root, path), content);
  }
}
if (stale.length)
  throw new Error(`Generated files are stale: ${stale.join(', ')}. Run npm run build.`);
console.error(
  checking
    ? 'Types and generated files verified.'
    : 'Type-check passed. Offline bundles and third-party notices rebuilt.',
);
