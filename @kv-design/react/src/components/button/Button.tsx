import {
  Button as DsButton,
  type ButtonProps as DsButtonProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import './button.css';

type ButtonProps = DsButtonProps;
const Button = DsButton as ForwardRefExoticComponent<
  ButtonProps & RefAttributes<ComponentRef<typeof DsButton>>
>;

export type { ButtonProps };
export { Button };
