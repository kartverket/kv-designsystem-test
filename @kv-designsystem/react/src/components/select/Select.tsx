import { Select, type SelectProps } from '@digdir/designsystemet-react';

// Fixing Select being displayed as React.ForwardRef in Storybook preview code snippets.
Select.displayName = 'Select';

export type { SelectProps };
export { Select };
