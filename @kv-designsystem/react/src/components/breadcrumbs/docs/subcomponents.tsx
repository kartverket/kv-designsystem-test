import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const BreadcrumbsList: FunctionComponent<
  Omit<ComponentProps<typeof Breadcrumbs.List>, 'children'> & {
    /** Should be one or more Breadcrumbs.Item elements */
    children?: ReactNode;
  }
> = () => null;

const BreadcrumbsItem: FunctionComponent<
  Omit<ComponentProps<typeof Breadcrumbs.Item>, 'children'> & {
    /** Should be a single Breadcrumbs.Link element */
    children?: ReactNode;
  }
> = () => null;

const BreadcrumbsLink: FunctionComponent<
  Omit<ComponentProps<typeof Breadcrumbs.Link>, 'children'> & {
    /** The text of the link */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Breadcrumbs's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Breadcrumbs.List': BreadcrumbsList,
  'Breadcrumbs.Item': BreadcrumbsItem,
  'Breadcrumbs.Link': BreadcrumbsLink,
};
