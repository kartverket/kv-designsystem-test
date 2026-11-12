import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import type { Dropdown } from '../Dropdown';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const DropdownHeading: FunctionComponent<
  Omit<ComponentProps<typeof Dropdown.Heading>, 'children'> & {
    /** Heading text */
    children?: ReactNode;
  }
> = () => null;

const DropdownList: FunctionComponent<
  Omit<ComponentProps<typeof Dropdown.List>, 'children'> & {
    /** Should be one or more Dropdown.Item elements */
    children?: ReactNode;
  }
> = () => null;

const DropdownItem: FunctionComponent<
  Omit<ComponentProps<typeof Dropdown.Item>, 'children'> & {
    /** Should be a single Dropdown.Button */
    children?: ReactNode;
  }
> = () => null;

const DropdownButton: FunctionComponent<
  Omit<ComponentProps<typeof Dropdown.Button>, 'children'> & {
    /** Content of the button */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Dropdown's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Dropdown.Heading': DropdownHeading,
  'Dropdown.List': DropdownList,
  'Dropdown.Item': DropdownItem,
  'Dropdown.Button': DropdownButton,
};
