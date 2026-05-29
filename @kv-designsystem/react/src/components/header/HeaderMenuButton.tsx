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
	function HeaderMenuButton({ children, ...rest }, ref) {
		return (
			<Button
				className='header-menu-button'
				variant='tertiary'
				commandFor='header-menu'
				command='show-modal'
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
