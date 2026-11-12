import { posix } from 'node:path';
import ts from 'typescript';
import {
  isRecord,
  type Diagnostic,
  type PublicExport,
  type SourceConfig,
  type SourceFile,
} from './types.js';

const extensions = ['ts', 'tsx', 'mts', 'js', 'jsx', 'mjs'];

/** The indexed file a relative module specifier points to, as TypeScript would resolve it. */
export function resolveModule(
  files: Record<string, SourceFile>,
  from: string,
  specifier: string,
): string | undefined {
  if (!specifier.startsWith('.')) return undefined;
  const stem = posix.normalize(posix.join(posix.dirname(from), specifier)).replace(/\/$|\.js$/, '');
  return [
    stem,
    ...extensions.map((ext) => `${stem}.${ext}`),
    ...extensions.map((ext) => `${stem}/index.${ext}`),
  ].find((candidate) => Object.hasOwn(files, candidate));
}

function packageName(files: Record<string, SourceFile>, entry: string): string | undefined {
  for (let folder = posix.dirname(entry); folder !== '.'; folder = posix.dirname(folder)) {
    const file = files[`${folder}/package.json`];
    if (!file) continue;
    try {
      const pkg: unknown = JSON.parse(file.content);
      if (isRecord(pkg) && typeof pkg.name === 'string') return pkg.name;
    } catch {
      // Fall through to the next folder up.
    }
  }
  return undefined;
}

const exported = (node: ts.Node): boolean =>
  ts.canHaveModifiers(node) &&
  !!ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

/**
 * Names exported from the configured entry points, followed through `export *` and named
 * re-exports with static syntax only.
 */
export function publicExports(
  files: Record<string, SourceFile>,
  config: SourceConfig,
  diagnostics: Diagnostic[],
): PublicExport[] {
  const found = new Map<string, PublicExport>();
  for (const entry of config.entryPoints) {
    if (!Object.hasOwn(files, entry)) {
      diagnostics.push({ path: entry, message: 'Entry point is not indexed; check sources.json.' });
      continue;
    }
    const pkg = packageName(files, entry);
    const seen = new Set<string>();
    const add = (name: string, path: string, kind: PublicExport['kind'] = 'value'): void => {
      if (!found.has(name)) found.set(name, { name, kind, path, package: pkg });
    };
    const visit = (path: string): void => {
      if (seen.has(path)) return;
      seen.add(path);
      const file = files[path];
      if (!file) return;
      const ast = ts.createSourceFile(path, file.content, ts.ScriptTarget.Latest, true);
      for (const statement of ast.statements) {
        if (ts.isExportDeclaration(statement)) {
          const specifier =
            statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
              ? statement.moduleSpecifier.text
              : undefined;
          // Names re-exported from another package belong to this file; local ones are followed.
          const target = specifier?.startsWith('.') ? resolveModule(files, path, specifier) : path;
          const clause = statement.exportClause;
          if (!target || (!clause && target === path)) {
            diagnostics.push({ path, message: `Cannot follow export from ${specifier}.` });
            continue;
          }
          if (!clause) visit(target);
          else if (ts.isNamespaceExport(clause)) add(clause.name.text, target);
          else
            for (const element of clause.elements)
              add(
                element.name.text,
                target,
                statement.isTypeOnly || element.isTypeOnly ? 'type' : 'value',
              );
        } else if (ts.isVariableStatement(statement) && exported(statement)) {
          for (const declaration of statement.declarationList.declarations)
            if (ts.isIdentifier(declaration.name)) add(declaration.name.text, path);
        } else if (
          (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) &&
          statement.name &&
          exported(statement)
        ) {
          add(statement.name.text, path);
        } else if (
          (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) &&
          exported(statement)
        ) {
          add(statement.name.text, path, 'type');
        }
      }
    };
    visit(entry);
  }
  return [...found.values()].sort((a, b) => a.name.localeCompare(b.name));
}
