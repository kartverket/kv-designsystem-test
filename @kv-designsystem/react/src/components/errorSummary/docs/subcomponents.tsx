import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { ErrorSummary } from '../ErrorSummary';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const ErrorSummaryHeading: FunctionComponent<
  Omit<ComponentProps<typeof ErrorSummary.Heading>, 'children'> & {
    /** Heading text */
    children?: ReactNode;
  }
> = () => null;

const ErrorSummaryList: FunctionComponent<
  Omit<ComponentProps<typeof ErrorSummary.List>, 'children'> & {
    /** Should be one or more ErrorSummary.Item elements */
    children?: ReactNode;
  }
> = () => null;

const ErrorSummaryItem: FunctionComponent<
  Omit<ComponentProps<typeof ErrorSummary.Item>, 'children'> & {
    /** Should be a single ErrorSummary.Link element */
    children?: ReactNode;
  }
> = () => null;

const ErrorSummaryLink: FunctionComponent<
  Omit<ComponentProps<typeof ErrorSummary.Link>, 'children'> & {
    /** The error message, linking to the field with the error */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of ErrorSummary's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'ErrorSummary.Heading': ErrorSummaryHeading,
  'ErrorSummary.List': ErrorSummaryList,
  'ErrorSummary.Item': ErrorSummaryItem,
  'ErrorSummary.Link': ErrorSummaryLink,
};
