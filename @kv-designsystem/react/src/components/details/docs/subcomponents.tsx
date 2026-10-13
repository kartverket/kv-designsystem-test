import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Details } from '../Details';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const DetailsContent: FunctionComponent<
  Omit<ComponentProps<typeof Details.Content>, 'children'> & {
    /** Content shown when expanded */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Details's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Details.Summary': Details.Summary,
  'Details.Content': DetailsContent,
};
