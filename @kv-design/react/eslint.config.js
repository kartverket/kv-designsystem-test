// // For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import nxEslintPlugin from '@nx/eslint-plugin';
// import storybook from "eslint-plugin-storybook";

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//     },
//   },
// ])


import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import baseConfig, { importConfig } from '../../eslint.config.js';

// Shared restricted imports across the repo
const commonRestrictedImports = [
  { group: ['@kv-design/react', '@kv-design/react/*'], message: 'Do not import from @kv-design/react. Use relative paths instead.' },
  { group: ['**/dist/*'], message: 'Do not import from the dist directory.' },
  { group: ['**/node_modules/*'], message: 'Do not import from the node_modules directory.' },
];

export default defineConfig([
  nxEslintPlugin.configs['flat/react'],
  storybook.configs['flat/recommended'],
  baseConfig,
  { ignores: ['!.storybook'] }, // Avoid excluding .storybook directory

  // TypeScript specific rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: [
          '@kv-design/react/tsconfig.*?.json',
          '@kv-design/react/tsconfig.storybook.json',
        ],
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-redeclare': 'off',
      'no-restricted-imports': ['error', { patterns: commonRestrictedImports }],
      'import/order': [
        'error',
        {
          ...importConfig,
          pathGroups: [
            ...importConfig.pathGroups,
            { pattern: '.storybook/**', group: 'internal' },
          ],
        },
      ],
      'react/forward-ref-uses-ref': 'error',
    },
  },

  // TypeScript-specific barrel file restrictions
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['src/alpha.ts', 'src/beta.ts', 'src/stable.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...commonRestrictedImports,
            {
              regex:
                '^((src|\\.{1,2})\\/)((\\.{1,2}\\/)|\\w+\\/)*(alpha|beta|stable)',
              message: 'Do not import from barrel files.',
            },
          ],
        },
      ],
    },
  },

  // JavaScript overrides (empty for now)
  { files: ['**/*.{js,jsx}'], rules: {} },

  // Storybook & docs-specific overrides
  {
    files: ['**/*.stories.{ts,tsx}', '**/{.storybook,demo,docs}/**/*.{ts,tsx}'],
  },
]);
