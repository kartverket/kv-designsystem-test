import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { DescriptionList } from '../';

const DescriptionListItem: FunctionComponent<
  Omit<ComponentProps<typeof DescriptionList.Item>, 'children'> & {
    /** A DescriptionList.Term followed by a DescriptionList.Description, as direct children. */
    children?: ReactNode;
  }
> = () => null;

const DescriptionListTerm: FunctionComponent<
  Omit<ComponentProps<typeof DescriptionList.Term>, 'children'> & {
    /** Term text or an SVG icon with an accessible name. */
    children?: ReactNode;
  }
> = () => null;

const DescriptionListDescription: FunctionComponent<
  Omit<ComponentProps<typeof DescriptionList.Description>, 'children'> & {
    /** Description corresponding to the term. */
    children?: ReactNode;
  }
> = () => null;

export const subcomponents = {
  'DescriptionList.Item': DescriptionListItem,
  'DescriptionList.Term': DescriptionListTerm,
  'DescriptionList.Description': DescriptionListDescription,
};
