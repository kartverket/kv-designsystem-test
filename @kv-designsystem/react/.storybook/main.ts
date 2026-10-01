import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

// Digdir types compound components as a type alias (`type Card = typeof Card & { Block: ... }`),
// which react-docgen-typescript doesn't recognise as a component. Without these, the
// components below get no props table / Controls in Storybook.
// The name must match both Digdir's type alias and our wrapper file name (Card.tsx -> 'Card').
const compoundComponents = [
  'Breadcrumbs',
  'Card',
  'Details',
  'Dialog',
  'Dropdown',
  'ErrorSummary',
  'Field',
  'Fieldset',
  'Pagination',
  'Popover',
  'Search',
  'Select',
  'Suggestion',
  'Table',
  'Tabs',
  'ToggleGroup',
];

const config: StorybookConfig = {
  stories: ['../src/documentation/introduction/Introduction.mdx', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  // docs: { defaultName: 'Dokumentasjon' },
  staticDirs: ['../assets'],
  framework: '@storybook/react-vite',
  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      base: process.env.STORYBOOK_BASE_PATH || '/',
    });
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.lib.json',
      // limit docgen to actual component source
      include: ['**/src/**/*.tsx'],
      // Required for unions like Size, Color etc from @digdir to generate options in Storybook controls
      shouldExtractLiteralValuesFromEnum: true,
      // Removes "undefined" as an option in Storybook controls for optional properties
      shouldRemoveUndefinedFromOptional: true,
      customComponentTypes: compoundComponents,
      // Docgen names compound components after Digdir's internal const (e.g. 'CardComponent'),
      // so the info isn't attached to our export. Use the wrapper file name instead.
      componentNameResolver: (_exp, source) => {
        const fileName = path.basename(source.fileName, path.extname(source.fileName));
        return compoundComponents.includes(fileName) ? fileName : undefined;
      },
    },
  },
};
export default config;
