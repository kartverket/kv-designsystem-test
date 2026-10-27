import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Use the same token values as component props when generating CSS.
import {
  layoutItemMinWidths,
  layoutSizes,
} from '../../react/src/components/layout/layoutTokens.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPONENTS_DIRECTORY = path.resolve(__dirname, '../../react/src/components');
const CSS_SOURCE_DIRECTORY = path.resolve(__dirname, '../src');
const COMPONENTS_CSS_OUTPUT = path.resolve(CSS_SOURCE_DIRECTORY, 'components.css');
const LAYOUT_DIRECTORY = path.resolve(COMPONENTS_DIRECTORY, 'layout');
const LAYOUT_TOKENS_CSS_OUTPUT = path.resolve(LAYOUT_DIRECTORY, 'layoutTokens.generated.css');

const gapProperties = ['gap', 'row-gap', 'column-gap'] as const;

/**
 * Find component CSS source files. Generated CSS is written separately.
 * CSS modules are reserved for Storybook and documentation styling, so they are excluded from the
 * shared component CSS published in the npm package.
 */
function findComponentCssFiles(directory: string): string[] {
  let cssFiles: string[] = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      cssFiles = cssFiles.concat(findComponentCssFiles(filePath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.css') &&
      !entry.name.endsWith('.module.css') &&
      !entry.name.endsWith('.generated.css')
    ) {
      cssFiles.push(filePath);
    }
  }

  return cssFiles;
}

function getSizeValue(size: number): string {
  return size === 0 ? '0px' : `var(--ds-size-${size})`;
}

function generateGapRules(layoutSizes: readonly number[]): string {
  // Each gap property creates one rule for every token size.
  return gapProperties
    .flatMap((property) =>
      layoutSizes.map(
        (size) =>
          `.kvds-flex[data-${property}='${size}'],\n.kvds-grid[data-${property}='${size}'] {\n  ${property}: ${getSizeValue(size)};\n}`,
      ),
    )
    .join('\n\n');
}

function generateItemMinWidthRules(layoutItemMinWidths: readonly number[]): string {
  // Each width creates one Flex rule and one Grid rule.
  return layoutItemMinWidths
    .flatMap((width) => {
      const value = `calc(${width}rem / 16)`;

      return [
        `.kvds-flex[data-item-min-width='${width}'] > * {\n  flex: 1 1 ${value};\n}`,
        `.kvds-grid[data-item-min-width='${width}'] {\n  --kvdsc-layout-item-min-width: ${value};\n}`,
      ];
    })
    .join('\n\n');
}

function generateLayoutTokensCss(): string {
  const gapRules = generateGapRules(layoutSizes);
  const itemMinWidthRules = generateItemMinWidthRules(layoutItemMinWidths);

  return `/* This file is generated from layoutTokens.ts. Do not edit manually. */

${gapRules}

/* Item widths use rem so they scale with the user's root font size.
   Dividing by 16 makes a value such as 250 equal 250px at the default 16px root size. */

${itemMinWidthRules}
`;
}

/**
 * Keep imports in a stable order so identical input always produces identical generated CSS.
 */
const componentCssImports = findComponentCssFiles(COMPONENTS_DIRECTORY)
  .sort()
  .map((file) => {
    const relativePath = path.relative(CSS_SOURCE_DIRECTORY, file);
    return `@import "${relativePath}" layer(kv.components);`;
  })
  .join('\n');

const layoutTokensImport =
  '@import "../../react/src/components/layout/layoutTokens.generated.css" layer(kv.components);';

fs.writeFileSync(COMPONENTS_CSS_OUTPUT, `${layoutTokensImport}\n${componentCssImports}`);
fs.writeFileSync(LAYOUT_TOKENS_CSS_OUTPUT, generateLayoutTokensCss());

console.log(`✅ Generated ${COMPONENTS_CSS_OUTPUT}`);
