import { Dialog, type DialogProps } from '@digdir/designsystemet-react';

// Fixing Dialog being displayed as React.ForwardRef in Storybook snippets.
Dialog.displayName = 'Dialog';

export type { DialogProps };
export { Dialog };
