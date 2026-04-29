import { forwardRef, AnchorHTMLAttributes } from 'react';
import { ButtonProps, Button } from '../button/Button';

export type HeaderNavItemProps = ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

// HeaderNavItem er alltid en lenkeknapp
export const HeaderNavItem = forwardRef<
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
