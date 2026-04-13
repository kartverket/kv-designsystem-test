import { Fieldset, type FieldsetProps } from '@digdir/designsystemet-react';

// Fixing Fieldset being displayed as React.ForwardRef in Storybook snippets.
Fieldset.displayName = 'Fieldset';

export type { FieldsetProps };
export { Fieldset };
