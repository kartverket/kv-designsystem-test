import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Select } from '../Select';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const SelectOption: FunctionComponent<
  Omit<ComponentProps<typeof Select.Option>, 'children'> & {
    /** Text for this option. Can be omitted if both `label` and `value` is set */
    children?: ReactNode;
  }
> = () => null;

const SelectOptgroup: FunctionComponent<
  Omit<ComponentProps<typeof Select.Optgroup>, 'children'> & {
    /** Should be one or more `Select.Option` elements */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Select's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Select.Option': SelectOption,
  'Select.Optgroup': SelectOptgroup,
};
