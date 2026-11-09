// Small JavaScript bootstrap: build logic is type-checked TypeScript.
import { transform } from 'esbuild';
import { readFile, writeFile, unlink } from 'node:fs/promises';
const temporary = new URL(`.build-${process.pid}.mjs`, import.meta.url);
try {
  const source = await readFile(new URL('build.ts', import.meta.url), 'utf8');
  const result = await transform(source, { loader: 'ts', format: 'esm', target: 'node22' });
  await writeFile(temporary, result.code);
  await import(temporary.href);
} finally {
  await unlink(temporary).catch(() => {});
}
