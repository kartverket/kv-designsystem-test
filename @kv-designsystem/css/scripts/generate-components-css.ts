import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPONENTS_DIRECTORY = path.resolve(__dirname, '../../react/src/components');
const CSS_SOURCE_DIRECTORY = path.resolve(__dirname, '../src');
const COMPONENTS_CSS_OUTPUT = path.resolve(CSS_SOURCE_DIRECTORY, 'components.css');

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

function createCssImport(filePath: string): string {
  const relativePath = path.relative(CSS_SOURCE_DIRECTORY, filePath);
  return `@import "${relativePath}" layer(kv.components);`;
}

/**
 * Keep imports in a stable order so identical input always produces identical generated CSS.
 */
const componentCssImports = findComponentCssFiles(COMPONENTS_DIRECTORY)
  .sort()
  .map(createCssImport)
  .join('\n');

const layoutTokensPath = path.join(COMPONENTS_DIRECTORY, 'layout', 'layoutTokens.generated.css');
const layoutTokensImport = createCssImport(layoutTokensPath);
const descriptionListBreakpointsPath = path.join(
  COMPONENTS_DIRECTORY,
  'descriptionList',
  'descriptionListBreakpoints.generated.css',
);
const descriptionListBreakpointsImport = createCssImport(descriptionListBreakpointsPath);

fs.writeFileSync(
  COMPONENTS_CSS_OUTPUT,
  `${layoutTokensImport}\n${componentCssImports}\n${descriptionListBreakpointsImport}`,
);

console.log(`✅ Generated ${COMPONENTS_CSS_OUTPUT}`);
