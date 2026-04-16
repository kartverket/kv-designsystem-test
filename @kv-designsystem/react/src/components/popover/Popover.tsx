import { Popover, type PopoverProps } from '@digdir/designsystemet-react';

// Fixing Popover being displayed as React.ForwardRef in Storybook preview code snippets.
Popover.displayName = 'Popover';

export type { PopoverProps };
export { Popover };
