import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Card } from '../Card';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const CardBlock: FunctionComponent<
  Omit<ComponentProps<typeof Card.Block>, 'children'> & {
    /** Content of the block */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Card's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Card.Block': CardBlock,
};
