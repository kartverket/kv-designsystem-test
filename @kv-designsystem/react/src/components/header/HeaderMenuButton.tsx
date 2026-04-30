import { forwardRef } from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';

export type HeaderMenuButtonProps = ButtonProps;

// Lage Popoverkomponent
export const HeaderMenuButton = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  function HeaderMenuButton({children, ...rest }, ref) {
    return (
			<Button 
				className='header-menu-button'
				variant='secondary' 
				popoverTarget='header-menu'
				ref={ref} 
				{...rest}
			>
					{children}
			</Button>
    );
  }
);
