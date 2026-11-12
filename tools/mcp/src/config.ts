import { readFile, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute, sep, posix } from 'node:path';
import { z } from 'zod';
import type { SourceConfig } from './types.js';

const safePath = z
  .string()
  .min(1)
  .refine(
    (value) =>
      !isAbsolute(value) &&
      !value.includes('\\') &&
      !value.split('/').some((part) => part === '..' || part.startsWith('.')) &&
      posix.normalize(value) === value,
    'Use a normalized repository-relative path without dot segments',
  );
const schema = z
  .object({
    documentationRoot: safePath,
    componentRoots: z.array(safePath),
    tokenRoots: z.array(safePath),
    sourceRoots: z.array(safePath).min(1),
    additionalFiles: z.array(safePath),
    entryPoints: z.array(safePath).default([]),
    dependencyRoots: z.array(safePath).default([]),
    storybookBaseUrl: z
      .url()
      .refine((value) => ['http:', 'https:'].includes(new URL(value).protocol)),
  })
  .strict();

export const CONFIG_PATH = 'tools/mcp/sources.json';
export const under = (path: string, root: string): boolean =>
  path === root || path.startsWith(`${root}/`);
export async function containedPath(root: string, path: string): Promise<string> {
  const canonical = await realpath(resolve(root, path));
  const rel = relative(root, canonical);
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel))
    throw new Error(`Path escapes repository: ${path}`);
  return canonical;
}
export async function readConfigText(root: string): Promise<string> {
  return readFile(await containedPath(root, CONFIG_PATH), 'utf8');
}
export function parseConfig(text: string): SourceConfig {
  return schema.parse(JSON.parse(text));
}
export async function readConfig(root: string): Promise<SourceConfig> {
  return parseConfig(await readConfigText(root));
}
