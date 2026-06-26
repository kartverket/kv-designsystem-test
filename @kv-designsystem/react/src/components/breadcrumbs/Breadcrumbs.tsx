import { Breadcrumbs, type BreadcrumbsProps } from '@digdir/designsystemet-react';

// Fixing Breadcrumbs being displayed as React.ForwardRef in Storybook preview code snippets.
Breadcrumbs.displayName = 'Breadcrumbs';

export type { BreadcrumbsProps };
export { Breadcrumbs };
