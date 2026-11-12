import ts from 'typescript';
import { readLocalSources } from './local-sources.js';
import { under } from './config.js';
import { resolveModule } from './exports.js';
import type {
  Dependency,
  Entry,
  Pagination,
  PublicExport,
  Snapshot,
  SourceFile,
  Token,
} from './types.js';

const normalize = (value: string): string =>
  value
    .toLocaleLowerCase('nb-NO')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae');
// Inferred from the Storybook ID; get_status notes that links are not checked against the site.
const storybookUrl = (entry: Entry, baseUrl: string): string =>
  `${baseUrl.replace(/\/$/, '')}/?path=/${entry.type}/${entry.id}`;
const summary = (entry: Entry, baseUrl: string) => ({
  id: entry.id,
  title: entry.title,
  name: entry.name,
  type: entry.type,
  url: storybookUrl(entry, baseUrl),
});
const page = <T>(items: T[], offset: number, limit: number) => ({
  total: items.length,
  offset,
  nextOffset: offset + limit < items.length ? offset + limit : null,
  items: items.slice(offset, offset + limit),
});
const importLine = /^\s*(?:import|export)\b/;
const headingLine = /^\s*#{1,6}\s/;
const declarationFile = /\.d\.m?ts$/;
const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Normalised text is derived once per indexed file and reused while the snapshot stays cached.
interface SearchText {
  lines: string[];
  normalizedLines: string[];
  haystack: string;
}
const searchTexts = new WeakMap<SourceFile, SearchText>();
function searchText(file: SourceFile): SearchText {
  let text = searchTexts.get(file);
  if (!text) {
    const lines = file.content.split('\n');
    const normalizedLines = lines.map(normalize);
    text = { lines, normalizedLines, haystack: normalizedLines.join('\n') };
    searchTexts.set(file, text);
  }
  return text;
}
const countOccurrences = (haystack: string, needle: string): number => {
  let count = 0;
  for (
    let index = haystack.indexOf(needle);
    index >= 0;
    index = haystack.indexOf(needle, index + 1)
  )
    count += 1;
  return count;
};
// A whole word or identifier: `label` in `<Label>` or `Label.tsx`, not in `aria-label` or `LabelProps`.
const wholeWords = new Map<string, RegExp>();
const wholeWord = (term: string): RegExp => {
  let pattern = wholeWords.get(term);
  if (!pattern) {
    pattern = new RegExp(`(?<![\\w$-])${escapeRegExp(term)}(?![\\w$-])`, 'g');
    wholeWords.set(term, pattern);
  }
  return pattern;
};
const countWholeWords = (haystack: string, term: string): number =>
  haystack.match(wholeWord(term))?.length ?? 0;
function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const substitution = (previous[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1);
      current[j] = Math.min((previous[j] ?? 0) + 1, (current[j - 1] ?? 0) + 1, substitution);
    }
    previous = current;
  }
  return previous[b.length] ?? 0;
}

const dirname = (path: string): string => path.slice(0, path.lastIndexOf('/'));
const storybookModule = /^@?storybook(?:\/|$)/;
const canvasBlock =
  /<Canvas\b[^>]*?\bof=\{\s*([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\}[^>]*?\/>/g;
const primaryBlock = /<Primary\s*\/>/g;
const controlsBlock = /<Controls\b[^>]*?\/>/g;
// One import a story file makes, classified by where a user gets it from.
interface StoryImport {
  local: string;
  imported: string;
  kind: 'public' | 'external' | 'helper';
  from: string;
  default?: boolean;
  namespace?: boolean;
}
const storyImports = new WeakMap<SourceFile, StoryImport[]>();
const withoutLayers = (context: string): string =>
  context
    .split(' › ')
    .filter((part) => !part.startsWith('@layer'))
    .join(' › ');

export async function loadCatalog(repositoryRoot: string) {
  return new Catalog(await readLocalSources(repositoryRoot));
}

export class Catalog {
  readonly docs: Entry[];
  readonly tokens: Token[];
  private readonly exportsByName = new Map<string, PublicExport>();
  constructor(readonly snapshot: Snapshot) {
    this.docs = snapshot.entries.filter((entry) => entry.type === 'docs');
    this.tokens = snapshot.tokens;
    for (const item of snapshot.exports) this.exportsByName.set(item.name, item);
  }

  status() {
    return {
      ...this.snapshot.metadata,
      tokens: this.tokens.length,
      dependencies: this.snapshot.dependencies,
      offline: true,
    };
  }

  list({
    query = '',
    kind = 'all',
    offset = 0,
    limit = 30,
  }: Pagination & { query?: string; kind?: 'all' | 'component' | 'guide' } = {}) {
    const q = normalize(query);
    return page(
      this.docs
        .filter(
          (entry) =>
            (!q || normalize(entry.title).includes(q)) &&
            (kind === 'all' || (kind === 'component' ? entry.component : !entry.component)),
        )
        .map((entry) => summary(entry, this.snapshot.config.storybookBaseUrl)),
      offset,
      limit,
    );
  }

  search({ query, offset = 0, limit = 10 }: Pagination & { query: string }) {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) throw new Error('Enter one or more search terms.');
    const dependencyRoots = this.snapshot.config.dependencyRoots;
    // A term that names a public export (`Label`) points at its file and the page that documents it.
    const exportHits = new Map<string, number>();
    for (const item of this.values())
      if (terms.includes(normalize(item.name)))
        for (const path of [item.path, this.docFor(item.path)?.path])
          if (path) exportHits.set(path, (exportHits.get(path) ?? 0) + 1);
    const hits = [];
    for (const [path, file] of Object.entries(this.snapshot.files)) {
      const docs = this.docs.filter(
        (entry) => entry.path === path || entry.examples.includes(path),
      );
      const title = docs[0]?.title ?? path.split('/').at(-1) ?? path;
      const normalizedTitle = normalize(title);
      // `Label` for `label.d.ts`, `Typography` for `Typography/Overview`.
      const titleWords = normalize(title.split('/').at(-1) ?? title).replace(/\..*$/, '');
      const normalizedPath = normalize(path);
      const { lines, normalizedLines, haystack } = searchText(file);
      if (
        !terms.every(
          (term) =>
            normalizedTitle.includes(term) ||
            normalizedPath.includes(term) ||
            haystack.includes(term),
        )
      )
        continue;
      // Rank by how often and where the terms occur; anchor the snippet on the best line, which
      // prefers lines matching every term, headings, and prose over import statements.
      let occurrences = 0;
      let whole = 0;
      let headingHits = 0;
      let best = { line: 0, rank: -1 };
      lines.forEach((raw, index) => {
        const line = normalizedLines[index] ?? '';
        let matched = 0;
        let wholeHere = 0;
        for (const term of terms) {
          const count = countOccurrences(line, term);
          if (count) {
            matched += 1;
            occurrences += count;
            wholeHere += countWholeWords(line, term);
          }
        }
        if (!matched) return;
        whole += wholeHere;
        const heading = headingLine.test(raw);
        if (heading && wholeHere) headingHits += 1;
        const rank =
          matched * 4 + (wholeHere ? 2 : 0) + (heading ? 2 : 0) + (importLine.test(raw) ? 0 : 1);
        if (rank > best.rank) best = { line: index, rank };
      });
      // Whole words count fully and substrings (`aria-label` for `label`) a quarter. The design
      // system's own files rank above the dependency files that its components re-export.
      const score =
        terms.reduce(
          (score, term) =>
            score +
            (titleWords === term ? 25 : normalizedTitle.includes(term) ? 10 : 0) +
            (normalizedPath.includes(term) ? 5 : 0),
          0,
        ) +
        (path.endsWith('.mdx') ? 3 : 0) +
        (dependencyRoots.some((root) => under(path, root)) ? -10 : 0) +
        (exportHits.get(path) ?? 0) * 20 +
        Math.min(whole, 30) +
        Math.min(occurrences - whole, 40) / 4 +
        Math.min(headingHits, 4) * 5;
      const start = Math.max(0, best.line - 2);
      hits.push({
        title,
        path,
        documentId: docs[0]?.id,
        score,
        matches: occurrences,
        line: best.line + 1,
        snippet: lines
          .slice(start, best.line + 4)
          .join('\n')
          .slice(0, 600),
      });
    }
    hits.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
    return { query, ...page(hits, offset, limit) };
  }

  document(id: string) {
    const entry = this.docs.find((entry) => entry.id === id);
    if (!entry) throw new Error(`Unknown document: ${id}. Use list_documents or search_docs.`);
    const path = entry.path;
    const file = this.snapshot.files[path];
    if (!file) throw new Error(`Missing document source: ${path}`);
    return {
      ...summary(entry, this.snapshot.config.storybookBaseUrl),
      path,
      // Storybook blocks are replaced by the example code they show; get_source has the raw MDX.
      content: this.render(entry, file.content),
      examples: entry.examples,
      // A document can gather stories from several files with their own titles (e.g. Typography).
      stories: this.snapshot.entries
        .filter(
          (item) =>
            item.type === 'story' &&
            (entry.examples.includes(item.path) || item.title === entry.title),
        )
        .map((story) => ({
          id: story.id,
          name: story.name,
          url: storybookUrl(story, this.snapshot.config.storybookBaseUrl),
        })),
    };
  }

  /** Replace `<Canvas of>`, `<Primary />` and `<Controls />` with code a user can copy. */
  private render(entry: Entry, content: string): string {
    const namespaces = entry.namespaces ?? {};
    const example = (path: string | undefined, exportName: string | undefined, raw: string) => {
      const story = this.snapshot.entries.find(
        (item) => item.type === 'story' && item.path === path && item.exportName === exportName,
      );
      if (!story?.code || !path) return raw;
      const imports = this.importsFor(path, story.code);
      return [
        `**Example: ${story.name}** (story \`${story.id}\`, source \`${path}\`)`,
        '',
        '```tsx',
        ...(imports ? [imports, ''] : []),
        story.code,
        '```',
      ].join('\n');
    };
    return content
      .replace(canvasBlock, (raw, namespace: string, exportName: string) =>
        example(namespaces[namespace], exportName, raw),
      )
      .replace(primaryBlock, (raw) =>
        example(entry.primaryStory?.path, entry.primaryStory?.exportName, raw),
      )
      .replace(
        controlsBlock,
        '_Props: see `dependencyTypes` and `implementation` in get_component for the component._',
      );
  }

  /** Imports a story file makes, with relative imports of public exports mapped to the package. */
  private storyImports(path: string): StoryImport[] {
    const file = this.snapshot.files[path];
    if (!file) return [];
    const cached = storyImports.get(file);
    if (cached) return cached;
    const result: StoryImport[] = [];
    const ast = ts.createSourceFile(
      path,
      file.content,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    for (const statement of ast.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
        continue;
      const from = statement.moduleSpecifier.text;
      const clause = statement.importClause;
      if (!clause || clause.isTypeOnly || storybookModule.test(from)) continue;
      const relative = from.startsWith('.');
      const target = relative ? resolveModule(this.snapshot.files, path, from) : undefined;
      if (clause.name)
        result.push({
          local: clause.name.text,
          imported: 'default',
          kind: relative ? 'helper' : 'external',
          from,
          default: true,
        });
      const bindings = clause.namedBindings;
      if (bindings && ts.isNamespaceImport(bindings))
        result.push({
          local: bindings.name.text,
          imported: '*',
          kind: relative ? 'helper' : 'external',
          from,
          namespace: true,
        });
      else if (bindings)
        for (const element of bindings.elements) {
          if (element.isTypeOnly) continue;
          const imported = (element.propertyName ?? element.name).text;
          const exported = this.exportsByName.get(imported);
          const isPublic = relative && !!target && !!exported;
          result.push({
            local: element.name.text,
            imported,
            kind: isPublic ? 'public' : relative ? 'helper' : 'external',
            from: isPublic ? (exported.package ?? from) : from,
          });
        }
    }
    storyImports.set(file, result);
    return result;
  }

  /** Import lines for the names an example uses, as an application would write them. */
  private importsFor(path: string, code: string): string {
    const used = this.storyImports(path).filter((item) =>
      new RegExp(`(?<![\\w$.])${escapeRegExp(item.local)}(?![\\w$])`).test(code),
    );
    const groups = new Map<string, StoryImport[]>();
    for (const item of used) {
      const key = `${item.kind}\0${item.from}`;
      groups.set(key, [...(groups.get(key) ?? []), item]);
    }
    const lines: string[] = [];
    for (const items of groups.values()) {
      const first = items[0];
      if (!first) continue;
      const parts: string[] = [];
      const named: string[] = [];
      for (const item of items) {
        if (item.default) parts.push(item.local);
        else if (item.namespace) parts.push(`* as ${item.local}`);
        else
          named.push(
            item.imported === item.local ? item.local : `${item.imported} as ${item.local}`,
          );
      }
      if (named.length) parts.push(`{ ${named.join(', ')} }`);
      const line = `import ${parts.join(', ')} from '${first.from}';`;
      lines.push(
        first.kind === 'helper'
          ? `// Local helper of the example file, not in the package: ${line}`
          : line,
      );
    }
    return lines.join('\n');
  }

  /** Exported values (components, hooks); types are reached through their props declarations. */
  private values(): PublicExport[] {
    return this.snapshot.exports.filter((item) => item.kind === 'value');
  }

  /** The document that covers an exported file: stories in its folder, else the nearest doc above. */
  private docFor(path: string): Entry | undefined {
    const directory = dirname(path);
    const byStories = this.docs.find((entry) =>
      entry.examples.some((example) => dirname(example) === directory),
    );
    if (byStories) return byStories;
    for (let folder = directory; folder.includes('/'); folder = dirname(folder)) {
      const doc = this.docs.find((entry) => dirname(entry.path) === folder);
      if (doc) return doc;
    }
    return undefined;
  }

  /** Public exports with the import line users write and the document that covers them. */
  exports({ query = '', offset = 0, limit = 30 }: Pagination & { query?: string } = {}) {
    const q = normalize(query);
    return page(
      this.snapshot.exports
        .filter((item) => !q || normalize(item.name).includes(q))
        .map((item) => ({
          name: item.name,
          kind: item.kind,
          import: `import ${item.kind === 'type' ? 'type ' : ''}{ ${item.name} } from '${item.package ?? item.path}';`,
          documentId: this.docFor(item.path)?.id,
          path: item.path,
        })),
      offset,
      limit,
    );
  }

  /** Closest document and export names for an unknown lookup: prefix, substring or edit distance. */
  suggest(name: string, limit = 5): string[] {
    const q = normalize(name);
    if (!q) return [];
    const candidates = [
      ...this.docs.map((entry) => ({
        base: entry.title.split('/').at(-1) ?? entry.title,
        title: entry.title,
        label: entry.id,
      })),
      ...this.values().map((item) => ({ base: item.name, title: item.name, label: 'export' })),
    ];
    // Docs come first, so a name with both a document and an export suggests the document ID.
    const seen = new Set<string>();
    return candidates
      .filter((entry) => !seen.has(entry.base) && !!seen.add(entry.base))
      .map((entry) => {
        const base = entry.base;
        const normalizedBase = normalize(base);
        let score = 0;
        if (normalizedBase.startsWith(q) || q.startsWith(normalizedBase)) score = 80;
        else if (normalize(entry.title).includes(q)) score = 60;
        else {
          const distance = editDistance(q, normalizedBase);
          const tolerance = Math.max(2, Math.floor(Math.min(q.length, normalizedBase.length) / 3));
          if (distance <= tolerance) score = 50 - distance;
        }
        return { entry, base, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.base.localeCompare(b.base))
      .slice(0, limit)
      .map((item) => `${item.base} (${item.entry.label})`);
  }

  component(name: string) {
    const q = normalize(name);
    const matches = this.docs.filter(
      (entry) =>
        entry.component &&
        [
          entry.title.split('/').at(-1) ?? '',
          entry.title,
          entry.id,
          entry.path
            .split('/')
            .at(-1)
            ?.replace(/\.mdx?$/, '') ?? '',
        ].some((value) => normalize(value) === q),
    );
    if (matches.length > 1)
      throw new Error(
        `Ambiguous component. Use one of these IDs: ${matches.map((entry) => entry.id).join(', ')}`,
      );
    // Components documented on a shared page (Label under Typography) or outside componentRoots
    // (hooks) are found through the public exports instead.
    const exported = matches.length
      ? undefined
      : (this.values().find((item) => normalize(item.name) === q) ??
        this.snapshot.exports.find((item) => normalize(item.name) === q));
    const entry = matches[0] ?? (exported && this.docFor(exported.path));
    if (!entry) {
      if (exported)
        throw new Error(
          `${exported.name} is exported from ${exported.path} but has no documentation. Read the source with get_source.`,
        );
      const suggestions = this.suggest(name);
      throw new Error(
        `Unknown component: ${name}.${suggestions.length ? ` Did you mean: ${suggestions.join(', ')}?` : ''} Use list_documents with kind=component, list_exports or search_docs.`,
      );
    }
    const doc = this.document(entry.id);
    const directory = `${dirname(exported?.path ?? doc.path)}/`;
    const exports = this.values().filter((item) => item.path.startsWith(directory));
    const imports = [...new Set(exports.map((item) => item.package ?? item.path))].map(
      (from) =>
        `import { ${exports
          .filter((item) => (item.package ?? item.path) === from)
          .map((item) => item.name)
          .join(', ')} } from '${from}';`,
    );
    const implementation = Object.entries(this.snapshot.files)
      .filter(
        ([path]) =>
          path.startsWith(directory) &&
          /\.[cm]?[jt]sx?$/.test(path) &&
          !/\.(stories|test|spec)\./.test(path),
      )
      .map(([path, file]) => ({ path, content: file.content }));
    // Only dependencies this component imports from matter; say plainly when its props are missing.
    const missing = this.snapshot.dependencies.filter(
      (dependency) =>
        !dependency.indexed &&
        implementation.some((file) =>
          new RegExp(`from\\s*['"]${escapeRegExp(dependency.package)}(?:/|['"])`).test(
            file.content,
          ),
        ),
    );
    return {
      ...doc,
      import: imports.join('\n'),
      sourceFiles: Object.keys(this.snapshot.files).filter((path) => path.startsWith(directory)),
      implementation,
      dependencyTypes: this.dependencyTypes(implementation),
      note: [
        `${imports.length ? `Import in applications: ${imports.join(' ')} Relative imports in example files are internal to the design system. ` : ''}content has each Storybook example inlined as code; read the complete example files with get_source. dependencyTypes holds the type declarations (props) behind names this component imports or re-exports from installed dependencies such as @digdir/designsystemet-react.`,
        ...missing.map(
          (dependency) =>
            `The props of ${exported?.name ?? entry.title.split('/').at(-1) ?? name} come from ${dependency.package}, which is not indexed in this checkout, so dependencyTypes is incomplete: ${dependency.note ?? 'not indexed'} (${dependency.root})`,
        ),
      ].join(' '),
    };
  }

  /** Declarations behind names imported/re-exported from indexed dependencies. Static syntax only. */
  private dependencyTypes(implementation: { path: string; content: string }[]) {
    const indexed = this.snapshot.dependencies.filter((dependency) => dependency.indexed);
    const wanted = new Map<Dependency, Set<string>>();
    if (!indexed.length) return [];
    for (const file of implementation) {
      const ast = ts.createSourceFile(
        file.path,
        file.content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      for (const statement of ast.statements) {
        let specifier: string | undefined;
        const names: string[] = [];
        if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
          specifier = statement.moduleSpecifier.text;
          const bindings = statement.importClause?.namedBindings;
          if (bindings && ts.isNamedImports(bindings))
            for (const element of bindings.elements)
              names.push((element.propertyName ?? element.name).text);
        } else if (
          ts.isExportDeclaration(statement) &&
          statement.moduleSpecifier &&
          ts.isStringLiteral(statement.moduleSpecifier)
        ) {
          specifier = statement.moduleSpecifier.text;
          if (statement.exportClause && ts.isNamedExports(statement.exportClause))
            for (const element of statement.exportClause.elements)
              names.push((element.propertyName ?? element.name).text);
        }
        if (!specifier || !names.length) continue;
        const dependency = indexed.find(
          (item) => specifier === item.package || specifier.startsWith(`${item.package}/`),
        );
        if (!dependency) continue;
        const set = wanted.get(dependency) ?? new Set<string>();
        for (const name of names) set.add(name);
        wanted.set(dependency, set);
      }
    }
    const results: {
      package: string;
      version?: string;
      path: string;
      declares: string[];
      content: string;
    }[] = [];
    for (const [dependency, names] of wanted) {
      for (const [path, file] of Object.entries(this.snapshot.files)) {
        if (!under(path, dependency.root) || !declarationFile.test(path)) continue;
        const declares = [...names].filter((name) => {
          const pattern = escapeRegExp(name);
          const declared = new RegExp(
            `^\\s*(?:export\\s+)?(?:declare\\s+)?(?:abstract\\s+)?(?:type|interface|const|let|var|function|class|enum)\\s+${pattern}\\b`,
            'm',
          ).test(file.content);
          const exported =
            new RegExp(`^\\s*export\\s+(?:declare\\s+)?\\S+\\s+${pattern}\\b`, 'm').test(
              file.content,
            ) ||
            new RegExp(`export\\s*\\{[^}]*\\b${pattern}\\b[^}]*\\}\\s*;?\\s*$`, 'm').test(
              file.content,
            );
          return declared && exported;
        });
        if (declares.length)
          results.push({
            package: dependency.package,
            version: dependency.version,
            path,
            declares,
            content: file.content,
          });
      }
    }
    return results.slice(0, 25);
  }

  source({
    path,
    startLine = 1,
    limit = 160,
  }: {
    path: string;
    startLine?: number;
    limit?: number;
  }) {
    if (!Object.hasOwn(this.snapshot.files, path))
      throw new Error('Unknown source file. Use an exact path from a search or component lookup.');
    const file = this.snapshot.files[path];
    if (!file) throw new Error(`Missing source: ${path}`);
    const lines = file.content.split('\n');
    if (startLine > lines.length)
      throw new Error(`startLine is past the end of the file (${lines.length} lines).`);
    return {
      path,
      sourceUrl: file.url,
      sha256: file.sha256,
      totalLines: lines.length,
      startLine,
      nextLine: startLine - 1 + limit < lines.length ? startLine + limit : null,
      content: lines.slice(startLine - 1, startLine - 1 + limit).join('\n'),
    };
  }

  /** CSS custom properties grouped by name, each value with the selector it applies under. */
  cssVariables({
    query = '',
    file = '',
    context = '',
    offset = 0,
    limit = 20,
  }: Pagination & { query?: string; file?: string; context?: string } = {}) {
    const q = normalize(query);
    const c = normalize(context);
    const groups = new Map<string, { value: string; context: string; file: string }[]>();
    for (const item of this.snapshot.cssVariables) {
      if (
        !item.file.includes(file) ||
        !normalize(item.context).includes(c) ||
        !normalize(`${item.name} ${item.value}`).includes(q)
      )
        continue;
      const definitions = groups.get(item.name) ?? [];
      // Bundled copies (an index.css next to its parts) repeat a declaration, sometimes inside
      // an extra `@layer`; layers do not change where a value applies, so they are ignored here.
      const key = withoutLayers(item.context);
      if (!definitions.some((d) => withoutLayers(d.context) === key && d.value === item.value))
        definitions.push({ value: item.value, context: item.context, file: item.file });
      groups.set(item.name, definitions);
    }
    // An exact or partial name match outranks a variable that only mentions the query in its value.
    const rank = (name: string): number => {
      const n = normalize(name);
      return n === q ? 0 : n.includes(q) ? 1 : 2;
    };
    for (const definitions of groups.values())
      definitions.sort(
        (a, b) => Number(!a.context.includes(':root')) - Number(!b.context.includes(':root')),
      );
    return {
      note: 'In your own CSS, use the semantic variables without a color name, for example var(--ds-color-text-default). They follow data-color and data-color-scheme on the nearest parent. --ds-color-<color>-* are the values behind them. --dsc-* are component variables that you can override on the component. context shows the layer, media query and selector where a value applies.',
      ...page(
        [...groups]
          .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
          .map(([name, definitions]) => ({ name, usage: `var(${name})`, definitions })),
        offset,
        limit,
      ),
    };
  }

  getTokens({
    query = '',
    file = '',
    type = '',
    offset = 0,
    limit = 30,
  }: Pagination & { query?: string; file?: string; type?: string } = {}) {
    const q = normalize(query);
    const matching = this.tokens.filter(
      (token) =>
        token.file.includes(file) &&
        normalize(
          `${token.name} ${JSON.stringify(token.value)} ${token.description ?? ''}`,
        ).includes(q),
    );
    // Counted before the type filter, so the counts show which types the other filters contain.
    const types: Record<string, number> = {};
    for (const token of matching) types[token.type ?? ''] = (types[token.type ?? ''] ?? 0) + 1;
    return {
      note: 'Raw design tokens. References such as {color...} are unresolved; file identifies theme, size and light/dark mode. types counts the matches per token type; pass one as type to list that category. For the CSS variables applications use, call get_css_variables.',
      compiledCss: Object.keys(this.snapshot.files).filter(
        (path) => path.endsWith('.css') && path.includes('/dist/'),
      ),
      types: Object.fromEntries(Object.entries(types).sort(([a], [b]) => a.localeCompare(b))),
      ...page(type ? matching.filter((token) => token.type === type) : matching, offset, limit),
    };
  }
}
