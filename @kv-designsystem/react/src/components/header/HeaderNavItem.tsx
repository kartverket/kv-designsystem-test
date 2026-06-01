import { forwardRef, AnchorHTMLAttributes, RefAttributes, ForwardRefExoticComponent } from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';

export type HeaderNavItemProps = ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const HeaderNavItem: ForwardRefExoticComponent<HeaderNavItemProps & RefAttributes<HTMLAnchorElement>> = forwardRef<
  HTMLAnchorElement, HeaderNavItemProps>(
  function HeaderNavItem({children, ...rest }, ref) {
    return (
      <li className='header-nav-item'>
        <Button asChild variant='tertiary'>
          <a ref={ref} {...rest}>
            {children}
          </a>
        </Button>
      </li>
    );
  }
);
