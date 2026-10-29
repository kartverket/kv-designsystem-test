import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { layoutItemMinWidths, layoutSizes } from '../src/components/layout/layoutTokens.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(__dirname, '../src/components/layout/layoutTokens.generated.css');
const gapProperties = ['gap', 'row-gap', 'column-gap'] as const;

function getSizeValue(size: number): string {
  return size === 0 ? '0px' : `var(--ds-size-${size})`;
}

function generateGapRules(): string {
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

function generateItemMinWidthRules(): string {
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
  return `/* This file is generated from layoutTokens.ts. Do not edit manually. */

${generateGapRules()}

/* Item widths use rem so they scale with the user's root font size.
   Dividing by 16 makes a value such as 250 equal 250px at the default 16px root size. */

${generateItemMinWidthRules()}
`;
}

fs.writeFileSync(OUTPUT, generateLayoutTokensCss());
console.log(`✅ Generated ${OUTPUT}`);
