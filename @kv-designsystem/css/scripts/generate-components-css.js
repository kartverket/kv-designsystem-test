import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, '../../react/src/components');
const OUTPUT = path.resolve(__dirname, '../src/components.css');

function getCssFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getCssFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.css') &&
      !entry.name.endsWith('.module.css')
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getCssFiles(ROOT)
  .sort() // important for deterministic builds
  .map((file) => {
    // make path relative to the css package
    const relativePath = path.relative(
      path.resolve('src'),
      file
    );
    return `@import "${relativePath}" layer(kv.components);`;
  }).join('\n');

fs.writeFileSync(OUTPUT, files);

console.log(`✅ Generated ${OUTPUT}`);
