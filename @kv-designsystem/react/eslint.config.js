import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import baseConfig, { importOrderRules } from '../../eslint.config.js';

// Shared restricted imports across the repo
const commonRestrictedImports = [
  {
    group: ['@kv-designsystem/react', '@kv-designsystem/react/*'],
    message: 'Do not import from @kv-designsystem/react. Use relative paths instead.',
  },
  { group: ['**/dist/*'], message: 'Do not import from the dist directory.' },
  {
    group: ['**/node_modules/*'],
    message: 'Do not import from the node_modules directory.',
  },
];

export default defineConfig([
  nxEslintPlugin.configs['flat/react'],
  storybook.configs['flat/recommended'],
  baseConfig,
  { ignores: [
      '!.storybook',  // Avoid excluding .storybook directory
      'src/components'  // TODO: remove this to when components are ready to be linted
      ] 
  },
  // TypeScript specific rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: [
          '@kv-designsystem/react/tsconfig.*?.json',
          '@kv-designsystem/react/tsconfig.storybook.json',
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
          ...importOrderRules,
          pathGroups: [
            ...importOrderRules.pathGroups,
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
