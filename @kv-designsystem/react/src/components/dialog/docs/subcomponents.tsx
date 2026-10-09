import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Dialog } from '../Dialog';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const DialogTriggerContext: FunctionComponent<
  Omit<ComponentProps<typeof Dialog.TriggerContext>, 'children'> & {
    /** Should be a Dialog.Trigger and a Dialog */
    children?: ReactNode;
  }
> = () => null;

const DialogTrigger: FunctionComponent<
  Omit<ComponentProps<typeof Dialog.Trigger>, 'children'> & {
    /** Content of the button that opens the dialog */
    children?: ReactNode;
  }
> = () => null;

const DialogBlock: FunctionComponent<
  Omit<ComponentProps<typeof Dialog.Block>, 'children'> & {
    /** Content of the block */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Dialog's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Dialog.TriggerContext': DialogTriggerContext,
  'Dialog.Trigger': DialogTrigger,
  'Dialog.Block': DialogBlock,
};
