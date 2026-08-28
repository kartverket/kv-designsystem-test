import cl from 'clsx/lite';
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { HeaderDialogTrigger, type HeaderDialogTriggerProps } from './HeaderDialogTrigger';

// Omit `primaryIcon` because this component always uses `MenuHamburgerIcon`.
// Omit `label` to redfine as optional. 
export type HeaderMenuButtonProps = Omit<HeaderDialogTriggerProps, 'primaryIcon' | 'label'> & {
  label?: string;
};

export const HeaderMenuButton: ForwardRefExoticComponent<
  HeaderMenuButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  function HeaderMenuButton({ className, commandFor = 'menu-dialog', label = 'Meny', ...rest }, ref) {
    return (
      <HeaderDialogTrigger
        className={cl('header-menu-button', className)}
        commandFor={commandFor}
        label={label}
        primaryIcon={MenuHamburgerIcon}
        ref={ref}
        {...rest}
      />
    );
  }
);
