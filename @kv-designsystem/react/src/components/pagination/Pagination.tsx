import { Pagination, type PaginationProps } from '@digdir/designsystemet-react';

// Fixing Pagination being displayed as React.ForwardRef in Storybook preview code snippets.
Pagination.displayName = 'Pagination';

export type { PaginationProps };
export { Pagination };
