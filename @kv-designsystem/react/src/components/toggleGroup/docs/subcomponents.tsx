import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { ToggleGroup } from '../ToggleGroup';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const ToggleGroupItem: FunctionComponent<
  Omit<ComponentProps<typeof ToggleGroup.Item>, 'children'> & {
    /** Content of the item: text, an icon or both */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of ToggleGroup's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'ToggleGroup.Item': ToggleGroupItem,
};
