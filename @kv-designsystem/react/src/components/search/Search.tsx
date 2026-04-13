import { Search, type SearchProps } from '@digdir/designsystemet-react';

// Fixing Search being displayed as React.ForwardRef in Storybook snippets.
Search.displayName = 'Search';

export type { SearchProps };
export { Search };
