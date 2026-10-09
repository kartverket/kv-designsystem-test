import type { Color, SeverityColors, Size } from '@digdir/designsystemet-types';
import { INTERNAL_DEFAULT_PROJECT_ANNOTATIONS } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import type { ArgTypesExtractor, ExtractedJsDoc } from 'storybook/internal/docs-tools';
import type { StrictArgTypes } from 'storybook/internal/types';

// Fixes props that Storybook can't show well on its own:
// 1. data-color and data-size without options (e.g. `Size | (string & {})`) get radio buttons
//    or a select with the available values.
// 2. data-size with its own options (e.g. Avatar's `'xs' | Size`) gets them sorted from
//    small to large. Fix 1 skips these, since they already have options.
// 3. aria-* flags typed as `Booleanish` (e.g. aria-hidden) get a boolean switch.
// 4. Deprecated props (e.g. Avatar's `variant`) are hidden from the props table and Controls.
// 5. data-color and data-size are hidden on subcomponents (e.g. Search.Clear), where they
//    usually do nothing.
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

// Fix 4. Hide props Digdir has marked `@deprecated` from the props table and Controls, so we
// only document what consumers should use. Where Digdir points to a replacement, the story
// adds it to Controls instead (e.g. --dsc-avatar-radius for Avatar's variant, see
// .storybook/utils/cssVariableArgTypes.ts).
const hideDeprecatedProps = (argTypes: StrictArgTypes): void => {
  for (const [name, argType] of Object.entries(argTypes)) {
    // Storybook types extra table fields as `unknown`. jsDocTags is set by extractReactArgTypes.
    const jsDocTags = argType.table?.jsDocTags as ExtractedJsDoc | undefined;
    if (jsDocTags?.deprecated == null) continue;

    argTypes[name] = { ...argType, table: { ...argType.table, disable: true } };
  }
};

// Fix 5. Digdir's CSS sets the sizes and colors of a subcomponent (e.g. Search.Clear) on the
// root (e.g. Search), so data-color and data-size on the subcomponent itself usually do nothing.
// We only show them on the root, where they work.
//
// To know which components are subcomponents, we collect them from all docs/subcomponents.tsx
// files. Storybook can't tell us, since it calls extractKvdsArgTypes with just the component.
const subcomponentFiles = import.meta.glob<{ subcomponents: Record<string, unknown> }>(
  '../../src/components/*/docs/subcomponents.tsx',
  { eager: true },
);

// Chip and List list their other variants as subcomponents (e.g. Chip.Checkbox next to
// Chip.Radio). They're standalone components, not parts of the root, so data-color and
// data-size work on them.
const standaloneVariants = ['Chip.Button', 'Chip.Checkbox', 'Chip.Removable', 'List.Ordered'];

const subcomponents = new Set(
  Object.values(subcomponentFiles).flatMap((file) =>
    Object.entries(file.subcomponents)
      .filter(([name]) => !standaloneVariants.includes(name))
      .map(([, subcomponent]) => subcomponent),
  ),
);

const hideColorAndSizeOnSubcomponents = (
  component: ComponentType,
  argTypes: StrictArgTypes,
): void => {
  if (!subcomponents.has(component)) return;

  for (const name of ['data-color', 'data-size']) {
    const argType = argTypes[name];
    if (argType) argTypes[name] = { ...argType, table: { ...argType.table, disable: true } };
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
  hideDeprecatedProps(argTypes);
  hideColorAndSizeOnSubcomponents(component, argTypes);
  return argTypes;
};
