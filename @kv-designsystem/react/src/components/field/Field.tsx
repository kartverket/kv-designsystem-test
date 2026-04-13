import { Field, type FieldProps } from '@digdir/designsystemet-react';

// Fixing Field being displayed as React.ForwardRef in Storybook code snippets.
Field.displayName = 'Field';

export type { FieldProps };
export { Field };
