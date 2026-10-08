import type { Color, SeverityColors, Size } from '@digdir/designsystemet-types';
import { INTERNAL_DEFAULT_PROJECT_ANNOTATIONS } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import type { ArgTypesExtractor } from 'storybook/internal/docs-tools';
import type { StrictArgTypes } from 'storybook/internal/types';

// Fixes props that Storybook can't show well on its own:
// 1. data-color and data-size without options (e.g. `Size | (string & {})`) get radio buttons
//    or a select with the available values.
// 2. data-size with its own options (e.g. Avatar's `'xs' | Size`) gets them sorted from
//    small to large. Fix 1 skips these, since they already have options.
// 3. aria-* flags typed as `Booleanish` (e.g. aria-hidden) get a boolean switch.
//
// Used as parameters.docs.extractArgTypes in preview.tsx (see extractKvdsArgTypes
// at the bottom). That way it also reaches the subcomponent tabs in Controls.

// All color names in the kvds theme. Color and SeverityColors get them from
// @kv-designsystem/theme/types (see tsconfig.storybook.json).
type ThemeColor = Color | SeverityColors;

// A value Storybook can show as an option in a select (see SBEnumType in storybook/internal/types)
type OptionValue = string | number;

// What fix 1 sets on data-color and data-size
interface KvdsArgType {
  options: OptionValue[];
  description: string;
}

// Types don't exist at runtime, so the names are listed here. An object instead of an array,
// because Record requires every ThemeColor as a key: the typecheck fails if a color is missing
// here, or no longer exists in the theme.
const colorNames: Record<ThemeColor, true> = {
  accent: true,
  'support-1': true,
  'support-2': true,
  neutral: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
};
const colors = Object.keys(colorNames);
const defaultSizes: Size[] = ['sm', 'md', 'lg'];

// The kvds descriptions to replace Digdir's (see pickDescription)
const colorAndSizeArgTypes: Record<'data-color' | 'data-size', KvdsArgType> = {
  'data-color': {
    options: colors,
    description: 'Changes the color of the component and its descendants.',
  },
  'data-size': {
    options: defaultSizes,
    description: 'Changes the size of the component and its descendants.',
  },
};

// Shown as the type in the props table, e.g. "sm" | "md" | "lg"
const typeSummary = (options: OptionValue[]): string =>
  options.map((option) => `"${option}"`).join(' | ');

// Picks the description shown for data-color/data-size in the props table. Docgen reads the
// description from the JSDoc comment on the prop in the component's types:
// - Most components get the prop from Digdir, whose JSDoc reads, e.g. "Use `data-size` to change
//   the size [...] Select from predefined sizes or define your own size." We don't want consumers
//   to define their own sizes or colors, so we show the kvds description instead.
// - Some components describe the prop themselves (Spinner). We want to keep that.
// - If the prop has no description, we show the kvds description.
const pickDescription = (
  docgenDescription: string | undefined,
  kvdsDescription: string,
): string => {
  const isFromDigdir = docgenDescription?.startsWith('Use `data-');
  return !docgenDescription || isFromDigdir ? kvdsDescription : docgenDescription;
};

// Fix 1: Digdir types data-color/data-size as `Size | (string & {})` in order to allow custom
// values. Docgen can't turn that into a list of options, so we add them here.
const addColorAndSizeOptions = (argTypes: StrictArgTypes): void => {
  for (const [name, kvds] of Object.entries(colorAndSizeArgTypes)) {
    const argType = argTypes[name];

    // Skip if the component doesn't have the prop, or already has its own options. Heading has
    // its own options, and components like Avatar have their own sizes (sorted by sortSizes).
    if (!argType || argType.options || argType.type?.name === 'enum') continue;

    argTypes[name] = {
      ...argType,
      options: kvds.options,
      description: pickDescription(argType.description, kvds.description),
      // Same rule Storybook uses for enums: radio buttons for a few options, a select for more
      control: { type: kvds.options.length <= 5 ? 'radio' : 'select' },
      table: { ...argType.table, type: { summary: typeSummary(kvds.options) } },
    };
  }
};

// All sizes used by Digdir components, from small to large
const sizeOrder = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

// Fix 2. Components with their own sizes (e.g. Avatar's `'xs' | Size`) get them in
// TypeScript's internal order, not as written, so 'xs' can end up after 'lg'.
const sortSizes = (argTypes: StrictArgTypes): void => {
  const argType = argTypes['data-size'];
  if (argType?.type?.name !== 'enum') return;

  // Sizes missing from sizeOrder go last
  const position = (size: OptionValue): number => {
    const index = sizeOrder.indexOf(String(size));
    return index === -1 ? sizeOrder.length : index;
  };
  const sorted = [...argType.type.value].sort((a, b) => position(a) - position(b));

  argTypes['data-size'] = {
    ...argType,
    type: { ...argType.type, value: sorted },
    table: { ...argType.table, type: { summary: typeSummary(sorted) } },
  };
};

// Fix 3. React types aria-* flags like aria-hidden as `Booleanish` (boolean | 'true' | 'false').
// Docgen keeps the name `Booleanish` instead of what it means, so Storybook shows a JSON editor.
const showBooleanishAsBoolean = (argTypes: StrictArgTypes): void => {
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
// through this export, which Storybook names INTERNAL but exports publicly. Storybook types
// parameters as `any`, so the type is set here.
const extractReactArgTypes: ArgTypesExtractor =
  INTERNAL_DEFAULT_PROJECT_ANNOTATIONS.parameters?.docs?.extractArgTypes;

// Storybook calls this both for the component's own props and for the subcomponent tabs in
// Controls (Table.Head, Card.Block and so on). An argTypesEnhancer would only reach the component's own props.
export const extractKvdsArgTypes = (component: ComponentType): StrictArgTypes | null => {
  const argTypes = extractReactArgTypes(component);
  if (!argTypes) return null;

  addColorAndSizeOptions(argTypes);
  sortSizes(argTypes);
  showBooleanishAsBoolean(argTypes);
  return argTypes;
};
