import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Field } from '../Field';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const FieldDescription: FunctionComponent<
  Omit<ComponentProps<typeof Field.Description>, 'children'> & {
    /** Description text */
    children?: ReactNode;
  }
> = () => null;

const FieldAffixes: FunctionComponent<
  Omit<ComponentProps<typeof Field.Affixes>, 'children'> & {
    /** Should be one or more Field.Affix elements and the form field */
    children?: ReactNode;
  }
> = () => null;

const FieldAffix: FunctionComponent<
  Omit<ComponentProps<typeof Field.Affix>, 'children'> & {
    /** Content of the affix, e.g. a currency or unit */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Field's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Field.Description': FieldDescription,
  'Field.Counter': Field.Counter,
  'Field.Affixes': FieldAffixes,
  'Field.Affix': FieldAffix,
};
