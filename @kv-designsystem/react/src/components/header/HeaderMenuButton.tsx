import { forwardRef } from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';
import { MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';

export type HeaderMenuButtonProps = ButtonProps;

export const HeaderMenuButton = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  function HeaderMenuButton({children, ...rest }, ref) {
    return (
			<Button 
				className='header-menu-button'
				variant='tertiary' 
				popoverTarget='header-menu'
				ref={ref} 
				{...rest}
			>
				<MenuHamburgerIcon aria-hidden />
				<XMarkIcon aria-hidden />
				{children ? children : 'Meny'}
			</Button>
    );
  }
);
