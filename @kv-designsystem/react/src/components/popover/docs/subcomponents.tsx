import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Popover } from '../Popover';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const PopoverTriggerContext: FunctionComponent<
  Omit<ComponentProps<typeof Popover.TriggerContext>, 'children'> & {
    /** Should be a Popover.Trigger and a Popover */
    children?: ReactNode;
  }
> = () => null;

// Popover.Trigger's props are a union (inline text or button). A plain Omit would only keep the
// props both have in common, so this removes children from each of them separately.
type OmitChildren<Props> = Props extends unknown ? Omit<Props, 'children'> : never;

const PopoverTrigger: FunctionComponent<
  OmitChildren<ComponentProps<typeof Popover.Trigger>> & {
    /** Content of the button that opens the popover */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Popover's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Popover.TriggerContext': PopoverTriggerContext,
  'Popover.Trigger': PopoverTrigger,
};
