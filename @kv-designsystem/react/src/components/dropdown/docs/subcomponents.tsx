import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Dropdown } from '../Dropdown';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const DropdownTriggerContext: FunctionComponent<
  Omit<ComponentProps<typeof Dropdown.TriggerContext>, 'children'> & {
    /** Should be a Dropdown.Trigger and a Dropdown */
    children?: ReactNode;
  }
> = () => null;

// Dropdown.Trigger's props are a union (inline text or button). A plain Omit would only keep the
// props both have in common, so this removes children from each of them separately.
type OmitChildren<Props> = Props extends unknown ? Omit<Props, 'children'> : never;

const DropdownTrigger: FunctionComponent<
  OmitChildren<ComponentProps<typeof Dropdown.Trigger>> & {
    /** Content of the button that opens the dropdown */
    children?: ReactNode;
  }
> = () => null;

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
  'Dropdown.TriggerContext': DropdownTriggerContext,
  'Dropdown.Trigger': DropdownTrigger,
  'Dropdown.Heading': DropdownHeading,
  'Dropdown.List': DropdownList,
  'Dropdown.Item': DropdownItem,
  'Dropdown.Button': DropdownButton,
};
