import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Chip } from '../Chip';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const ChipButton: FunctionComponent<
  Omit<ComponentProps<typeof Chip.Button>, 'children'> & {
    /** Text of the chip */
    children?: ReactNode;
  }
> = () => null;

const ChipCheckbox: FunctionComponent<
  Omit<ComponentProps<typeof Chip.Checkbox>, 'children'> & {
    /** Text of the chip */
    children?: ReactNode;
  }
> = () => null;

const ChipRemovable: FunctionComponent<
  Omit<ComponentProps<typeof Chip.Removable>, 'children'> & {
    /** Text of the chip */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Chip's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Chip.Button': ChipButton,
  'Chip.Checkbox': ChipCheckbox,
  'Chip.Removable': ChipRemovable,
};
