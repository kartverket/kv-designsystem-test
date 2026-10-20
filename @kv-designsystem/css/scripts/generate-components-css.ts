import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, '../../react/src/components');
const OUTPUT = path.resolve(__dirname, '../src/components.css');
const LAYOUT_TOKENS = path.resolve(
  __dirname,
  '../../react/src/components/layout/layoutTokens.ts',
);
const LAYOUT_TOKENS_CSS = path.resolve(
  __dirname,
  '../../react/src/components/layout/layoutTokens.generated.css',
);

function getCssFiles(dir: string): string[] {
  let results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getCssFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.css') &&
      !entry.name.endsWith('.module.css') &&
      !entry.name.endsWith('.generated.css')
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

function getTokenValues(name: string): number[] {
  const source = fs.readFileSync(LAYOUT_TOKENS, 'utf8');
  const match = source.match(new RegExp(`export const ${name} = (\\[[^\\]]+\\]) as const;`));

  if (!match) {
    throw new Error(`Could not find ${name} in ${LAYOUT_TOKENS}`);
  }

  const values = match[1].match(/\d+/g);
  if (!values) {
    throw new Error(`Could not read values for ${name} in ${LAYOUT_TOKENS}`);
  }

  return values.map(Number);
}

function sizeValue(size: number): string {
  return size === 0 ? '0px' : `var(--ds-size-${size})`;
}

function generateLayoutTokensCss(): string {
  const layoutSizes = getTokenValues('layoutSizes');
  const layoutItemMinWidths = getTokenValues('layoutItemMinWidths');
  const gaps = [
    ['gap', 'gap'],
    ['row-gap', 'row-gap'],
    ['column-gap', 'column-gap'],
  ]
    .flatMap(([property, attribute]) =>
      layoutSizes.map(
        (size) =>
          `.kvds-flex[data-${attribute}='${size}'],\n.kvds-grid[data-${attribute}='${size}'] {\n  ${property}: ${sizeValue(size)};\n}`,
      ),
    )
    .join('\n\n');
  const itemMinWidths = layoutItemMinWidths
    .flatMap((width) => {
      const value = `calc(${width}rem / 16)`;

      return [
        `.kvds-flex[data-item-min-width='${width}'] > * {\n  flex: 1 1 ${value};\n}`,
        `.kvds-grid[data-item-min-width='${width}'] {\n  --kvdsc-layout-item-min-width: ${value};\n}`,
      ];
    })
    .join('\n\n');

  return `/* This file is generated from layoutTokens.ts. Do not edit manually. */\n\n${gaps}\n\n${itemMinWidths}\n`;
}

const files = getCssFiles(ROOT)
  .sort() // important for deterministic builds
  .map((file) => {
    // make path relative to the css package
    const relativePath = path.relative(path.resolve('src'), file);
    return `@import "${relativePath}" layer(kv.components);`;
  })
  .join('\n');

const layoutTokensImport =
  '@import "../../react/src/components/layout/layoutTokens.generated.css" layer(kv.components);';

fs.writeFileSync(OUTPUT, `${layoutTokensImport}\n${files}`);
fs.writeFileSync(LAYOUT_TOKENS_CSS, generateLayoutTokensCss());

console.log(`✅ Generated ${OUTPUT}`);
