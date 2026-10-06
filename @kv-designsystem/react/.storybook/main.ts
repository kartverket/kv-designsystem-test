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
  stories: [
    '../src/documentation/introduction/Introduction.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
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
      // Turns unions of fixed values (e.g. variant: 'circle' | 'square') into options in Controls
      shouldExtractLiteralValuesFromEnum: true,
      // Removes "undefined" as an option in Storybook controls for optional properties
      shouldRemoveUndefinedFromOptional: true,
      // Decides which props are shown in the props table and Controls
      propFilter: (prop) => {
        // src/html.ts adds data-color/data-size to every HTML element. If the component itself
        // doesn't declare them (e.g. Paragraph's data-color), they have no effect, so hide them.
        const declaredIn = prop.declarations?.map((declaration) => declaration.fileName) ?? [];
        const onlyFromHtmlTs =
          declaredIn.length > 0 && declaredIn.every((file) => file.endsWith('src/html.ts'));
        if (onlyFromHtmlTs) return false;

        // Same as Storybook's default: hide props inherited from node_modules (e.g. onClick, id)
        return !prop.parent?.fileName.includes('node_modules');
      },
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
