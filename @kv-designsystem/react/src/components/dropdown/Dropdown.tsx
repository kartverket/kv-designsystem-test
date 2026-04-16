import { Dropdown, type DropdownProps } from '@digdir/designsystemet-react';

// Fixing Dropdown being displayed as React.ForwardRef in Storybook preview code snippets.
Dropdown.displayName = 'Dropdown';

export type { DropdownProps };
export { Dropdown };
