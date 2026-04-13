import { ToggleGroup, type ToggleGroupProps } from '@digdir/designsystemet-react';

// Fixing ToggleGroup being displayed as React.ForwardRef in Storybook snippets.
ToggleGroup.displayName = 'ToggleGroup';

export type { ToggleGroupProps };
export { ToggleGroup };
