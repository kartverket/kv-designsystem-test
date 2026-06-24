import cl from 'clsx/lite';
import { 
  forwardRef, 
  type AnchorHTMLAttributes,
} from 'react';
import { Button } from '../button/Button';

export type HeaderNavItemProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const HeaderNavItem = forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
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
