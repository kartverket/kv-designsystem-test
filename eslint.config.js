import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

const __dirname = dirname(fileURLToPath(import.meta.url));
const gitignorePath = resolve(__dirname, '.gitignore');

export const importConfig = { named: true };

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  // Nx recommended base configs
  nxEslintPlugin.configs['flat/base'],
  nxEslintPlugin.configs['flat/typescript'],
  nxEslintPlugin.configs['flat/javascript'],
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['eslint.config.js'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }],
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { import: importPlugin },
    rules: {
      'import/enforce-node-protocol-usage': ['error', 'always'],
      'import/newline-after-import': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
