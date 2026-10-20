import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { List } from '../List';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const ListOrdered: FunctionComponent<
  Omit<ComponentProps<typeof List.Ordered>, 'children'> & {
    /** Should be one or more List.Item elements */
    children?: ReactNode;
  }
> = () => null;

const ListItem: FunctionComponent<
  Omit<ComponentProps<typeof List.Item>, 'children'> & {
    /** Content of the list item */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of List's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'List.Ordered': ListOrdered,
  'List.Item': ListItem,
};
