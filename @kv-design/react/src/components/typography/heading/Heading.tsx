import {
  Heading as DsHeading,
  type HeadingProps as DsHeadingProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type HeadingProps = DsHeadingProps;

const Heading = DsHeading as ForwardRefExoticComponent<
  HeadingProps & RefAttributes<ComponentRef<typeof DsHeading>>
>;

export type { HeadingProps };
export { Heading };
