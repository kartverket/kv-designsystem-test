import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Search } from '../Search';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const SearchButton: FunctionComponent<
  Omit<ComponentProps<typeof Search.Button>, 'children'> & {
    /** Content of the button. Defaults to "Søk" */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Search's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Search.Input': Search.Input,
  'Search.Clear': Search.Clear,
  'Search.Button': SearchButton,
};
