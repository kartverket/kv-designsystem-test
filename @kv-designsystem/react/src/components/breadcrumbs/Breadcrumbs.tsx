import {
  Breadcrumbs,
  type BreadcrumbsProps,
  BreadcrumbsItem,
  type BreadcrumbsItemProps,
  BreadcrumbsLink,
  type BreadcrumbsLinkProps,
  BreadcrumbsList,
  type BreadcrumbsListProps,
} from '@digdir/designsystemet-react';

// Fixing Breadcrumbs being displayed as React.ForwardRef in Storybook preview code snippets.
Breadcrumbs.displayName = 'Breadcrumbs';

export type { 
  BreadcrumbsProps,
  BreadcrumbsItemProps,
  BreadcrumbsLinkProps,
  BreadcrumbsListProps,
 };
export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList };
