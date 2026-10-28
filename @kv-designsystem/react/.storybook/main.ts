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

// Docgen names these components after Digdir's internal name (e.g. 'CardComponent' or
// 'EXPERIMENTAL_AvatarStack'), so the props info isn't attached to our export.
// Use the wrapper file name instead (Card.tsx -> 'Card').
const componentsNamedAfterFile = [...compoundComponents, 'AvatarStack', 'FileUpload'];

// These files export an object with several components (e.g. Chip.Radio, List.Unordered)
// instead of one component. Docgen finds each of them as 'Radio', 'Unordered' etc., which
// don't exist in our file, so we prefix them with the file name ('Radio' -> 'Chip.Radio').
const componentGroups = ['Chip', 'List'];

// Some Digdir props are declared more than once, in different parts of a union type. E.g.
// Dropdown.Trigger's `inline` is declared both for the inline variant and for the button variant,
// each with `@default false`. Docgen joins the defaults with a line break, so the props table
// shows "false false". If all the defaults are the same, keep just one. If they differ, keep
// them all, so we don't hide what Digdir actually documents.
const mergeDuplicateDefaults = (prop: { defaultValue: { value: unknown } | null }) => {
  const value = prop.defaultValue?.value;
  if (typeof value !== 'string' || !value.includes('\n')) return;

  const defaults = new Set(value.split('\n'));
  if (defaults.size === 1) {
    prop.defaultValue = { value: [...defaults][0] };
  }
};

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
      // Like tsconfig.lib.json, but also reads docs/ folders (e.g. card/docs/subcomponents.tsx)
      tsconfigPath: 'tsconfig.docgen.json',
      // limit docgen to actual component source
      include: ['**/src/**/*.tsx'],
      // Turns unions of fixed values (e.g. variant: 'circle' | 'square') into options in Controls
      shouldExtractLiteralValuesFromEnum: true,
      // Removes "undefined" as an option in Storybook controls for optional properties
      shouldRemoveUndefinedFromOptional: true,
      // Keeps JSDoc tags like `@deprecated` in the description, where Storybook reads them.
      // extractKvdsArgTypes needs it to hide deprecated props. Storybook's docgen plugin turns
      // this on by default, which moves the tags out of the description.
      shouldIncludePropTagMap: false,
      // Decides which props are shown in the props table and Controls
      propFilter: (prop) => {
        // propFilter is the only place docgen lets us change a prop before it's used
        mergeDuplicateDefaults(prop);

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
      // Decides the name docgen attaches the props info to. undefined = use docgen's own name.
      componentNameResolver: (exp, source) => {
        const fileName = path.basename(source.fileName, path.extname(source.fileName));
        if (componentsNamedAfterFile.includes(fileName)) return fileName;
        if (componentGroups.includes(fileName)) return `${fileName}.${exp.getName()}`;
        return undefined;
      },
    },
  },
};
export default config;
