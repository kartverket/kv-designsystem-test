import cl from 'clsx/lite';
import {
	forwardRef,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import type { ButtonProps } from '../button/Button';
import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { HeaderDialogTrigger } from "./HeaderDialogTrigger";

export type HeaderMenuButtonProps = ButtonProps;

export const HeaderMenuButton: ForwardRefExoticComponent<
  HeaderMenuButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  function HeaderMenuButton( { className, commandFor='menu-dialog', ...rest}, ref) {
    return (
      <HeaderDialogTrigger 
        {...rest}
        ref={ref}
        primaryIcon={MenuHamburgerIcon}
        label="Meny"
        commandFor={commandFor}
		    className={cl('header-menu-button', className)}
      />
    );
  }
);
