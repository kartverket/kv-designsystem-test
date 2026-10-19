import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Pagination } from '../Pagination';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const PaginationList: FunctionComponent<
  Omit<ComponentProps<typeof Pagination.List>, 'children'> & {
    /** Should be one or more Pagination.Item elements */
    children?: ReactNode;
  }
> = () => null;

const PaginationItem: FunctionComponent<
  Omit<ComponentProps<typeof Pagination.Item>, 'children'> & {
    /** Should be a single Pagination.Button */
    children?: ReactNode;
  }
> = () => null;

const PaginationButton: FunctionComponent<
  Omit<ComponentProps<typeof Pagination.Button>, 'children'> & {
    /** Page number, or content of the previous/next button */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Pagination's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Pagination.List': PaginationList,
  'Pagination.Item': PaginationItem,
  'Pagination.Button': PaginationButton,
};
