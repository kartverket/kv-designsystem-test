import cl from 'clsx/lite';
import {
	forwardRef,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';
import { MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';

export type HeaderMenuButtonProps = ButtonProps;

export const HeaderMenuButton: ForwardRefExoticComponent<
	HeaderMenuButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
	function HeaderMenuButton({ children, className, commandFor='header-menu', ...rest }, ref) {
		return (
			<Button
				className={cl('header-menu-button', className)} 
				variant='tertiary'
				commandFor={commandFor}
				command='show-modal'
				ref={ref}
				{...rest}
			>
				<span className='menu-button-icon'>
					<MenuHamburgerIcon className='hamburger-icon' aria-hidden />
					<XMarkIcon className='close-icon' aria-hidden />
				</span>
				<span>{children ? children : 'Meny'}</span>
			</Button>
		);
	}
);
