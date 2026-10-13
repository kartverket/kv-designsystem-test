import cl from 'clsx/lite';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type HeaderNavProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
  /** Should be one or more Header.NavItem elements */
  children?: ReactNode;
};

export const HeaderNav = forwardRef<HTMLUListElement, HeaderNavProps>(
  function HeaderNav({ children, className, ...rest }, ref) {
    return (
      <nav
        aria-label='header-navigation'
        ref={ref}
        {...rest}
      >
        <ul className={cl('header-nav-list', className)}>{children}</ul>
      </nav>
    );
  }
);
