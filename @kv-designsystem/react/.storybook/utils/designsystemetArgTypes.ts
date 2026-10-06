import type { Size } from '@digdir/designsystemet-types';
import { INTERNAL_DEFAULT_PROJECT_ANNOTATIONS } from '@storybook/react-vite';
import type { StrictArgTypes as ArgTypes } from 'storybook/internal/types';
import tokensConfig from '@kv-designsystem/tokens/designsystemet.config.json';

// Fixes props that Storybook can't show well on its own:
// 1. data-color and data-size get a select with the available values.
// 2. Component-specific sizes (e.g. Avatar's) are sorted from small to large.
// 3. aria-* flags typed as `Booleanish` (e.g. aria-hidden) get a boolean switch.

const theme = tokensConfig.themes.green;
const colors = [...Object.keys(theme.colors), ...Object.keys(theme.overrides.severity)];
const sizes: Size[] = ['sm', 'md', 'lg'];

// All sizes used by Digdir components, from small to large
const sizeScale = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const propsWithOptions = {
  'data-color': {
    options: colors,
    description: 'Changes the color of the component and its descendants.',
  },
  'data-size': {
    options: sizes,
    description: 'Changes the size of the component and its descendants.',
  },
};

// Shown as the type in the props table, e.g. "sm" | "md" | "lg"
const typeSummary = (options: unknown[]) => options.map((option) => `"${option}"`).join(' | ');

// Digdir's own description starts with "Use `data-color` ..." or "Use `data-size` ...".
// It mentions custom values, which we don't want consumers to use, so we replace it.
const isDigdirDescription = (description?: string) =>
  !description || description.startsWith('Use `data-');

// Digdir types data-color/data-size as e.g. `Size | (string & {})` to allow custom values.
// Docgen can't turn that into a list of options, so we add them here.
const addColorAndSizeOptions = (argTypes: ArgTypes) => {
  for (const [name, { options, description }] of Object.entries(propsWithOptions)) {
    const argType = argTypes[name];

    // Skip if the component doesn't have the prop, or already has its own options (e.g. Heading)
    if (!argType || argType.options || argType.type?.name === 'enum') continue;

    argTypes[name] = {
      ...argType,
      options,
      // Keep descriptions written for the component (e.g. our Spinner)
      description: isDigdirDescription(argType.description) ? description : argType.description,
      control: { type: 'select' },
      table: { ...argType.table, type: { summary: typeSummary(options) } },
    };
  }
};

// Components with their own sizes (e.g. Avatar's `'xs' | Size`) get them in TypeScript's
// internal order, not as written, so 'xs' can end up after 'lg'.
const sortSizes = (argTypes: ArgTypes) => {
  const argType = argTypes['data-size'];
  if (argType?.type?.name !== 'enum') return;

  // Sizes missing from sizeScale go last
  const position = (size: unknown) => {
    const index = sizeScale.indexOf(String(size));
    return index === -1 ? sizeScale.length : index;
  };
  const sorted = [...argType.type.value].sort((a, b) => position(a) - position(b));

  argTypes['data-size'] = {
    ...argType,
    type: { ...argType.type, value: sorted },
    table: { ...argType.table, type: { summary: typeSummary(sorted) } },
  };
};

// React types aria-* flags like aria-hidden as `Booleanish` (boolean | 'true' | 'false').
// Docgen keeps the name `Booleanish` instead of what it means, so Storybook shows a JSON editor.
const showBooleanishAsBoolean = (argTypes: ArgTypes) => {
  for (const [name, argType] of Object.entries(argTypes)) {
    if (argType.type?.name !== 'other' || argType.type.value !== 'Booleanish') continue;

    argTypes[name] = {
      ...argType,
      type: { name: 'boolean', required: argType.type.required },
      control: { type: 'boolean' },
      table: { ...argType.table, type: { summary: 'boolean' } },
    };
  }
};

// Storybook's own function for reading a component's props from docgen. It's only available
// through this export, which Storybook names INTERNAL but exports publicly with types.
const extractReactArgTypes = INTERNAL_DEFAULT_PROJECT_ANNOTATIONS.parameters?.docs?.extractArgTypes;

// Used as parameters.docs.extractArgTypes in preview.tsx. Storybook calls it both for the
// component's own props and for the subcomponent tabs in Controls (e.g. Badge.Position).
// An argTypesEnhancer would only reach the component's own props.
export const extractDesignsystemetArgTypes = (component: unknown): ArgTypes | null => {
  const argTypes = extractReactArgTypes(component);
  if (!argTypes) return null;

  addColorAndSizeOptions(argTypes);
  sortSizes(argTypes);
  showBooleanishAsBoolean(argTypes);
  return argTypes;
};
