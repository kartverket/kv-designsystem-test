import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Badge } from '../Badge';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const BadgePosition: FunctionComponent<
  Omit<ComponentProps<typeof Badge.Position>, 'children'> & {
    /** Should be a Badge and the element it is placed on */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Badge's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Badge.Position': BadgePosition,
};
