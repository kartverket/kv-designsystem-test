import { Dropdown, type DropdownProps } from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Dropdown.displayName = 'Dropdown';

export type { DropdownProps };
export { Dropdown };
