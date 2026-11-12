import { posix } from 'node:path';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { under } from './config.js';
import {
  message,
  type Diagnostic,
  type Entry,
  type SourceConfig,
  type SourceFile,
} from './types.js';

export const slug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const displayName = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ');
const storyPattern = /\.stories\.[cm]?[jt]sx?$/;
const docPattern = /\.mdx?$/;
interface StoryGroup {
  title: string;
  id: string;
  entries: Entry[];
  inferred: boolean;
}

function autoTitle(path: string, root: string): string {
  const parts = posix
    .relative(root, path)
    .replace(/(?:\.stories)?\.[^.]+$/, '')
    .split('/');
  if (parts.length > 1 && parts.at(-1)?.toLowerCase() === parts.at(-2)?.toLowerCase())
    parts.splice(-2, 1);
  if (parts.at(-1)?.toLowerCase() === 'index') parts.pop();
  return parts.join('/') || posix.basename(path);
}

/** Read only static AST values. Never import, evaluate or transpile repository code. */
class StaticValues {
  readonly variables = new Map<string, ts.Expression>();
  private accessDepth = 0;
  constructor(readonly ast: ts.SourceFile) {
    for (const statement of ast.statements)
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name) && declaration.initializer)
            this.variables.set(declaration.name.text, declaration.initializer);
        }
      }
  }
  resolve(node: ts.Expression | undefined, seen = new Set<string>()): ts.Expression | undefined {
    if (!node) return undefined;
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node)
    )
      return this.resolve(node.expression, seen);
    if (ts.isIdentifier(node) && this.variables.has(node.text)) {
      if (seen.has(node.text)) return undefined;
      seen.add(node.text);
      return this.resolve(this.variables.get(node.text), seen);
    }
    // `Preview.args` and similar: follow static property access, bounded against cycles.
    if (ts.isPropertyAccessExpression(node) && this.accessDepth < 20) {
      this.accessDepth += 1;
      try {
        const value = this.property(node.expression, node.name.text);
        return value ? this.resolve(value, seen) : node;
      } finally {
        this.accessDepth -= 1;
      }
    }
    return node;
  }
  /** Story args in override order, with static spreads such as `...Preview.args` expanded. */
  args(
    node: ts.Expression | undefined,
    out = new Map<string, ts.Expression>(),
    depth = 0,
  ): Map<string, ts.Expression> {
    const resolved = this.resolve(node);
    if (!resolved || !ts.isObjectLiteralExpression(resolved) || depth > 12) return out;
    for (const prop of resolved.properties) {
      if (ts.isSpreadAssignment(prop)) this.args(prop.expression, out, depth + 1);
      else if (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) {
        const key = prop.name.getText(this.ast).replace(/^['"]|['"]$/g, '');
        out.delete(key);
        out.set(key, ts.isPropertyAssignment(prop) ? prop.initializer : prop.name);
      }
    }
    return out;
  }
  string(node: ts.Expression | undefined): string | undefined {
    const resolved = this.resolve(node);
    return resolved && ts.isStringLiteralLike(resolved) ? resolved.text : undefined;
  }
  property(node: ts.Expression | undefined, key: string, depth = 0): ts.Expression | undefined {
    const resolved = this.resolve(node);
    if (!resolved || !ts.isObjectLiteralExpression(resolved) || depth > 12) return undefined;
    // Later properties override earlier spreads, just as in JavaScript.
    for (const prop of [...resolved.properties].reverse()) {
      if (
        (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) &&
        prop.name.getText(this.ast).replace(/^['"]|['"]$/g, '') === key
      ) {
        return ts.isPropertyAssignment(prop) ? prop.initializer : prop.name;
      }
      if (ts.isSpreadAssignment(prop)) {
        const value = this.property(prop.expression, key, depth + 1);
        if (value) return value;
      }
    }
    return undefined;
  }
  filter(node: ts.Expression | undefined): ((name: string) => boolean) | undefined {
    const resolved = this.resolve(node);
    if (!resolved) return undefined;
    if (ts.isArrayLiteralExpression(resolved)) {
      const names = resolved.elements.map((element) => this.string(element));
      if (names.some((name) => name === undefined)) throw new Error('Dynamic story filter');
      return (name) => names.includes(name);
    }
    if (ts.isRegularExpressionLiteral(resolved)) {
      const end = resolved.text.lastIndexOf('/');
      const regex = new RegExp(resolved.text.slice(1, end), resolved.text.slice(end + 1));
      return (name) => {
        regex.lastIndex = 0;
        return regex.test(name);
      };
    }
    throw new Error('Dynamic story filter');
  }
}

/** The JSX a user writes for an args-only story: `<Button variant="primary">Lagre</Button>`. */
function storyJsx(
  component: string,
  args: Map<string, ts.Expression>,
  values: StaticValues,
): string {
  const attributes: string[] = [];
  let children = '';
  for (const [key, expression] of args) {
    const resolved = values.resolve(expression) ?? expression;
    const text = values.string(expression);
    const source = resolved.getText(values.ast);
    if (key === 'children') {
      // `[<Icon />, 'Rediger']` is written as ordinary JSX children.
      const items = ts.isArrayLiteralExpression(resolved) ? [...resolved.elements] : [resolved];
      children = items
        .map((item) => {
          const value = values.resolve(item) ?? item;
          // Text with JSX syntax or edge whitespace would change meaning as a literal child.
          if (ts.isStringLiteralLike(value))
            return /[<>{}&\r\n\t]| {2}/.test(value.text) || value.text.trim() !== value.text
              ? `{${JSON.stringify(value.text)}}`
              : value.text;
          return ts.isJsxElement(value) ||
            ts.isJsxFragment(value) ||
            ts.isJsxSelfClosingElement(value)
            ? value.getText(values.ast)
            : `{${value.getText(values.ast)}}`;
        })
        .join(' ');
      continue;
    }
    if (
      resolved.kind === ts.SyntaxKind.FalseKeyword ||
      (ts.isIdentifier(resolved) && resolved.text === 'undefined') ||
      // Storybook action spies (`fn()`) are test scaffolding, not part of the example.
      (ts.isCallExpression(resolved) && resolved.expression.getText(values.ast) === 'fn')
    )
      continue;
    if (resolved.kind === ts.SyntaxKind.TrueKeyword) attributes.push(key);
    // JSX decodes entities such as &amp; in attribute strings, so `&` needs an expression too.
    else if (text !== undefined && !/["\n&]/.test(text)) attributes.push(`${key}="${text}"`);
    else attributes.push(`${key}={${source}}`);
  }
  const open = [component, ...attributes].join(' ');
  return children ? `<${open}>${children}</${component}>` : `<${open} />`;
}

interface LocalDeclaration {
  order: number;
  text: string;
}

/** Top-level value declarations of a story file by name, except the default-exported meta. */
function localDeclarations(ast: ts.SourceFile): Map<string, LocalDeclaration> {
  const exported = ast.statements.find(ts.isExportAssignment)?.expression;
  const metaName = exported && ts.isIdentifier(exported) ? exported.text : undefined;
  const locals = new Map<string, LocalDeclaration>();
  ast.statements.forEach((statement, order) => {
    if (ts.isVariableStatement(statement)) {
      const list = statement.declarationList;
      const keyword = list.flags & ts.NodeFlags.Const ? 'const' : 'let';
      for (const declaration of list.declarations)
        if (ts.isIdentifier(declaration.name) && declaration.name.text !== metaName)
          locals.set(declaration.name.text, {
            order,
            text:
              list.declarations.length === 1
                ? statement.getText(ast)
                : `${keyword} ${declaration.getText(ast)};`,
          });
    } else if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name
    )
      locals.set(statement.name.text, { order, text: statement.getText(ast) });
  });
  return locals;
}

/** Identifiers that code reads, leaving out property, attribute and member names. */
function referencedNames(code: string): Set<string> {
  const ast = ts.createSourceFile(
    'example.tsx',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    const parent = node.parent;
    if (
      ts.isIdentifier(node) &&
      !(ts.isPropertyAccessExpression(parent) && parent.name === node) &&
      !(ts.isPropertyAssignment(parent) && parent.name === node) &&
      !(ts.isJsxAttribute(parent) && parent.name === node)
    )
      names.add(node.text);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return names;
}

/** Prepend the file-local declarations that code needs, transitively and in source order. */
function withLocals(code: string, name: string, locals: Map<string, LocalDeclaration>): string {
  const needed = new Map<string, LocalDeclaration>();
  const pending = [code];
  for (let text = pending.pop(); text !== undefined; text = pending.pop())
    for (const reference of referencedNames(text)) {
      const local = locals.get(reference);
      if (!local || reference === name || needed.has(reference) || code.includes(local.text))
        continue;
      needed.set(reference, local);
      pending.push(local.text);
    }
  if (!needed.size) return code;
  const declarations = [
    ...new Set([...needed.values()].sort((a, b) => a.order - b.order).map((item) => item.text)),
  ];
  return `// declared in the example file:\n${declarations.join('\n\n')}\n\n${code}`;
}

/** Example code for one story with the file-local declarations it uses. */
function storyCode(
  values: StaticValues,
  locals: Map<string, LocalDeclaration>,
  meta: ts.Expression | undefined,
  name: string,
  initializer: ts.Expression | undefined,
  statement: ts.Node | undefined,
): string {
  return withLocals(ownStoryCode(values, meta, name, initializer, statement), name, locals);
}

/** Example code for one story: its own render, the meta render, or JSX built from args. */
function ownStoryCode(
  values: StaticValues,
  meta: ts.Expression | undefined,
  name: string,
  initializer: ts.Expression | undefined,
  statement: ts.Node | undefined,
): string {
  const declared =
    statement?.getText(values.ast) ??
    (initializer ? `const ${name} = ${initializer.getText(values.ast)};` : '');
  if (!initializer || values.property(initializer, 'render')) return declared;
  const metaRender = values.property(meta, 'render');
  if (metaRender)
    return `// render from the meta object in the file:\nconst render = ${metaRender.getText(values.ast)};\n\n${declared}`;
  const component = values.resolve(values.property(meta, 'component'));
  if (!component || !(ts.isIdentifier(component) || ts.isPropertyAccessExpression(component)))
    return declared;
  const args = values.args(values.property(meta, 'args'));
  values.args(values.property(initializer, 'args'), args);
  return storyJsx(component.getText(values.ast), args, values);
}

function parseStories(
  path: string,
  content: string,
  config: SourceConfig,
  warn: (text: string) => void,
): StoryGroup {
  const ast = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const values = new StaticValues(ast);
  const locals = localDeclarations(ast);
  const meta = values.resolve(ast.statements.find(ts.isExportAssignment)?.expression);
  const titleNode = values.property(meta, 'title');
  const explicitTitle = values.string(titleNode);
  const title = explicitTitle ?? autoTitle(path, config.documentationRoot);
  const id = values.string(values.property(meta, 'id')) ?? slug(title);
  const group: StoryGroup = { title, id, entries: [], inferred: !explicitTitle };
  if (!meta || !ts.isObjectLiteralExpression(meta) || (titleNode && !explicitTitle)) {
    warn(
      'Dynamic or incomplete story metadata: title inferred from file path; source is still searchable.',
    );
  }
  let include: ((name: string) => boolean) | undefined;
  let exclude: ((name: string) => boolean) | undefined;
  try {
    include = values.filter(values.property(meta, 'includeStories'));
    exclude = values.filter(values.property(meta, 'excludeStories'));
  } catch {
    warn(
      'Dynamic story filter: individual stories omitted; source and associated documentation remain available.',
    );
    return group;
  }
  const add = (exportName: string, initializer?: ts.Expression, statement?: ts.Node): void => {
    if (
      exportName === 'default' ||
      exportName.startsWith('__') ||
      (include && !include(exportName)) ||
      exclude?.(exportName)
    )
      return;
    group.entries.push({
      id: `${id}--${slug(displayName(exportName))}`,
      title,
      name: values.string(values.property(initializer, 'name')) ?? displayName(exportName),
      type: 'story',
      path,
      examples: [],
      component: config.componentRoots.some((root) => under(path, root)),
      exportName,
      code: storyCode(values, locals, meta, exportName, initializer, statement),
    });
  };
  for (const statement of ast.statements) {
    if (
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const declaration of statement.declarationList.declarations)
        if (ts.isIdentifier(declaration.name))
          add(
            declaration.name.text,
            declaration.initializer,
            statement.declarationList.declarations.length === 1 ? statement : declaration,
          );
    } else if (
      ts.isFunctionDeclaration(statement) &&
      statement.name &&
      statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
      !statement.modifiers.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)
    ) {
      add(statement.name.text, undefined, statement);
    } else if (
      ts.isExportDeclaration(statement) &&
      !statement.isTypeOnly &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const specifier of statement.exportClause.elements)
        if (!specifier.isTypeOnly)
          add(
            specifier.name.text,
            values.variables.get(specifier.propertyName?.text ?? specifier.name.text),
          );
    }
  }
  return group;
}

function parseDocument(
  path: string,
  content: string,
  config: SourceConfig,
  stories: Map<string, StoryGroup>,
  warn: (text: string) => void,
): Entry {
  // Mask examples so a Meta tag shown in a fenced code block isn't treated as metadata.
  const text = content
    .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const ast = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const associated = new Map<string, string>();
  const metaNames = new Set(['Meta']);
  for (const statement of ast.statements)
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const bindings = statement.importClause?.namedBindings;
      const specifier = statement.moduleSpecifier.text;
      if (bindings && ts.isNamespaceImport(bindings) && specifier.startsWith('.')) {
        const stem = posix.normalize(posix.join(posix.dirname(path), specifier));
        const resolved = [
          stem,
          ...['tsx', 'ts', 'jsx', 'js', 'mts', 'mjs'].map((ext) => `${stem}.${ext}`),
        ].find((candidate) => stories.has(candidate));
        if (resolved) associated.set(bindings.name.text, resolved);
      }
      if (bindings && ts.isNamedImports(bindings) && specifier.includes('storybook')) {
        for (const item of bindings.elements)
          if ((item.propertyName?.text ?? item.name.text) === 'Meta') metaNames.add(item.name.text);
      }
    }
  let title: string | undefined;
  let story: StoryGroup | undefined;
  let metaPath: string | undefined;
  let sawMeta = false;
  for (const name of metaNames) {
    const tag = text.match(new RegExp(`<${name}\\b[\\s\\S]*?\\/>`))?.[0];
    if (!tag) continue;
    sawMeta = true;
    const tagAst = ts.createSourceFile(
      'meta.tsx',
      `const value = (${tag});`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const find = (node: ts.Node): void => {
      if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
        const init = node.initializer;
        const expr = init && ts.isJsxExpression(init) ? init.expression : init;
        if (node.name.text === 'title' && expr && ts.isStringLiteralLike(expr)) title = expr.text;
        if (node.name.text === 'of' && expr && ts.isIdentifier(expr)) {
          metaPath = associated.get(expr.text);
          story = stories.get(metaPath ?? '');
        }
      }
      ts.forEachChild(node, find);
    };
    find(tagAst);
  }
  if (sawMeta && !title && !story)
    warn('Unresolved MDX metadata: title inferred from path; full source remains available.');
  const resolvedTitle = title ?? story?.title ?? autoTitle(path, config.documentationRoot);
  return {
    id: `${title ? slug(title) : (story?.id ?? slug(resolvedTitle))}--docs`,
    title: resolvedTitle,
    name: 'Docs',
    type: 'docs',
    path,
    examples: [...associated.values()],
    component: config.componentRoots.some((root) => under(path, root)),
    namespaces: Object.fromEntries(associated),
    primaryStory:
      story?.entries[0]?.exportName && metaPath
        ? { path: metaPath, exportName: story.entries[0].exportName }
        : undefined,
  };
}

export function indexEntries(
  files: Record<string, SourceFile>,
  config: SourceConfig,
  diagnostics: Diagnostic[],
): Entry[] {
  const stories = new Map<string, StoryGroup>();
  for (const [path, file] of Object.entries(files)) {
    if (!under(path, config.documentationRoot) || !storyPattern.test(path)) continue;
    try {
      stories.set(
        path,
        parseStories(path, file.content, config, (message) => diagnostics.push({ path, message })),
      );
    } catch (error) {
      diagnostics.push({
        path,
        message: `Could not index stories: ${message(error)}. Source remains searchable.`,
      });
    }
  }
  const entries = [...stories.values()].flatMap((story) => story.entries);
  for (const [path, file] of Object.entries(files)) {
    if (!under(path, config.documentationRoot) || !docPattern.test(path)) continue;
    try {
      entries.push(
        parseDocument(path, file.content, config, stories, (message) =>
          diagnostics.push({ path, message }),
        ),
      );
    } catch (error) {
      diagnostics.push({ path, message: `Could not resolve document metadata: ${message(error)}` });
      entries.push({
        id: `${slug(autoTitle(path, config.documentationRoot))}--docs`,
        title: autoTitle(path, config.documentationRoot),
        name: 'Docs',
        type: 'docs',
        path,
        examples: [],
        component: config.componentRoots.some((root) => under(path, root)),
      });
    }
  }
  const groups = new Map<string, Entry[]>();
  for (const entry of entries) groups.set(entry.id, [...(groups.get(entry.id) ?? []), entry]);
  for (const [id, duplicates] of groups)
    if (duplicates.length > 1) {
      for (const entry of duplicates) {
        entry.id = `${id}-${createHash('sha256')
          .update(`${entry.path}\0${entry.exportName ?? ''}`)
          .digest('hex')
          .slice(0, 12)}`;
        diagnostics.push({
          path: entry.path,
          message: `Duplicate ID ${id}; use the disambiguated local ID. Storybook URL may not exist.`,
        });
      }
    }
  return entries.sort((a, b) => a.id.localeCompare(b.id));
}
