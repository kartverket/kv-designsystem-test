import type { CssVariable, SourceFile } from './types.js';

/**
 * CSS custom property declarations with the at-rules and selectors around them, such as
 * `@layer ds.theme.color-scheme.dark › [data-color-scheme="dark"]`. Static text scan only;
 * quoted strings and parentheses (`url("data:…;…")`) are skipped so they cannot end a rule.
 */
export function parseCssVariables(files: Record<string, SourceFile>): CssVariable[] {
  const variables: CssVariable[] = [];
  for (const [path, file] of Object.entries(files)) {
    if (!path.endsWith('.css')) continue;
    const text = file.content.replace(/\/\*[\s\S]*?\*\//g, '');
    const stack: string[] = [];
    let start = 0;
    let depth = 0;
    const declaration = (end: number): void => {
      const match = /^\s*(--[\w-]+)\s*:([\s\S]*)$/.exec(text.slice(start, end));
      if (match?.[1] && stack.length)
        variables.push({
          name: match[1],
          value: (match[2] ?? '').trim().replace(/\s+/g, ' '),
          context: stack.join(' › '),
          file: path,
        });
    };
    for (let index = 0; index < text.length; index++) {
      const char = text[index];
      if (char === '"' || char === "'") {
        for (index++; index < text.length && text[index] !== char; index++)
          if (text[index] === '\\') index++;
      } else if (char === '(') depth++;
      else if (char === ')') depth = Math.max(0, depth - 1);
      else if (depth) continue;
      else if (char === '{') {
        stack.push(text.slice(start, index).trim().replace(/\s+/g, ' '));
        start = index + 1;
      } else if (char === ';' || char === '}') {
        declaration(index);
        if (char === '}') stack.pop();
        start = index + 1;
      }
    }
  }
  return variables;
}
