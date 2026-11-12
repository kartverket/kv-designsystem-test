export interface SourceFile {
  content: string;
  url: string;
  sha256: string;
}
export interface Diagnostic {
  path: string;
  message: string;
}
export interface Entry {
  id: string;
  title: string;
  name: string;
  type: 'docs' | 'story';
  path: string;
  examples: string[];
  component: boolean;
  exportName?: string;
  /** Story only: code a user would write, from `render` or synthesised from `component` + args. */
  code?: string;
  /** Docs only: MDX namespace import name → stories file, used to inline `<Canvas of>` examples. */
  namespaces?: Record<string, string>;
  /** Docs only: the story `<Primary />` shows, the first story of the `<Meta of>` file. */
  primaryStory?: { path: string; exportName: string };
}
/** A value exported from a public entry point, with the file that defines or re-exports it. */
export interface PublicExport {
  name: string;
  kind: 'value' | 'type';
  path: string;
  /** Package name from the nearest package.json above the entry point. */
  package?: string;
}
export interface SourceConfig {
  documentationRoot: string;
  componentRoots: string[];
  tokenRoots: string[];
  sourceRoots: string[];
  additionalFiles: string[];
  /** Public entry points, such as the package's main index; their exports are what users import. */
  entryPoints: string[];
  /** Installed dependency folders whose type declarations describe re-exported components. */
  dependencyRoots: string[];
  storybookBaseUrl: string;
}
/** An installed dependency whose `.d.ts` files are indexed when present. */
export interface Dependency {
  root: string;
  package: string;
  version?: string;
  files: number;
  indexed: boolean;
  note?: string;
}
export interface Token {
  name: string;
  type?: string;
  value: unknown;
  description?: string;
  file: string;
  sourceUrl: string;
}
/** One declaration of a CSS custom property and the at-rules/selectors it applies under. */
export interface CssVariable {
  name: string;
  value: string;
  context: string;
  file: string;
}
export interface Snapshot {
  entries: Entry[];
  files: Record<string, SourceFile>;
  tokens: Token[];
  cssVariables: CssVariable[];
  exports: PublicExport[];
  dependencies: Dependency[];
  config: SourceConfig;
  metadata: {
    repositoryRoot: string;
    source: 'local-working-tree';
    indexedAt: string;
    contentSha256: string;
    documents: number;
    stories: number;
    files: number;
    diagnostics: Diagnostic[];
    note: string;
  };
}
export interface Pagination {
  offset?: number;
  limit?: number;
}
export function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
