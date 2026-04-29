import { forwardRef, AnchorHTMLAttributes } from 'react';
import { ButtonProps, Button } from '../button/Button';


export type HeaderNavItemProps = ButtonProps & 
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'secondary' | 'tertiary',
  };

// HeaderNavItem er alltid en lenkeknapp
export const HeaderNavItem = forwardRef<
  HTMLAnchorElement, HeaderNavItemProps>(
  function HeaderNavItem({ variant='tertiary', children, ...rest }, ref) {
    return (
      <li className='header-nav-item'>
        <Button asChild variant={variant}>
          <a ref={ref} {...rest}>
            {children}
          </a>
        </Button>
      </li>
    );
  }
);
