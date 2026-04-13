import { Tabs, type TabsProps } from '@digdir/designsystemet-react';

// Fixing Tabs being displayed as React.ForwardRef in Storybook code snippets.
Tabs.displayName = 'Tabs';

export type { TabsProps };
export { Tabs };
