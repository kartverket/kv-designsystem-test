import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Fieldset } from '../Fieldset';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const FieldsetLegend: FunctionComponent<
  Omit<ComponentProps<typeof Fieldset.Legend>, 'children'> & {
    /** Legend text */
    children?: ReactNode;
  }
> = () => null;

const FieldsetDescription: FunctionComponent<
  Omit<ComponentProps<typeof Fieldset.Description>, 'children'> & {
    /** Description text */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Fieldset's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Fieldset.Legend': FieldsetLegend,
  'Fieldset.Description': FieldsetDescription,
};
