import { under } from './config.js';
import { isRecord, message, type Diagnostic, type SourceFile, type Token } from './types.js';

/** Flatten W3C-style design-token JSON into named tokens. References stay unresolved. */
export function parseTokens(
  files: Record<string, SourceFile>,
  tokenRoots: string[],
  diagnostics: Diagnostic[],
): Token[] {
  const tokens: Token[] = [];
  for (const [path, file] of Object.entries(files)) {
    if (
      !tokenRoots.some((root) => under(path, root)) ||
      !path.endsWith('.json') ||
      path.includes('/$')
    )
      continue;
    const walk = (node: unknown, names: string[] = [], inheritedType?: string): void => {
      if (!isRecord(node)) return;
      const type = typeof node.$type === 'string' ? node.$type : inheritedType;
      if ('$value' in node) {
        tokens.push({
          name: names.join('.'),
          type,
          value: node.$value,
          description: typeof node.$description === 'string' ? node.$description : undefined,
          file: path,
          sourceUrl: file.url,
        });
        return;
      }
      for (const [key, value] of Object.entries(node))
        if (!key.startsWith('$')) walk(value, [...names, key], type);
    };
    try {
      walk(JSON.parse(file.content));
    } catch (error) {
      diagnostics.push({ path, message: `Cannot parse token JSON: ${message(error)}` });
    }
  }
  return tokens;
}
