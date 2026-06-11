import cl from 'clsx/lite';
import { 
  forwardRef, 
  type AnchorHTMLAttributes, 
  type RefAttributes, 
  type ForwardRefExoticComponent 
} from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';

export type HeaderNavItemProps = ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const HeaderNavItem: ForwardRefExoticComponent<HeaderNavItemProps & RefAttributes<HTMLAnchorElement>> = forwardRef<
  HTMLAnchorElement, HeaderNavItemProps>(
  function HeaderNavItem({ children, className, ...rest }, ref) {
    return (
      <li className={cl('header-nav-item', className)} >
        <Button asChild variant='tertiary'>
          <a ref={ref} {...rest}>
            {children}
          </a>
        </Button>
      </li>
    );
  }
);
