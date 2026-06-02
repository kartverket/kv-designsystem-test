import { forwardRef, HTMLAttributes } from 'react';

export type HeaderNavProps = HTMLAttributes<HTMLUListElement>;


export const HeaderNav = forwardRef<HTMLUListElement, HeaderNavProps>(
  function HeaderNav({ children, className, ...rest }, ref) {
    return (
      <nav 
        aria-label='header-navigation'
        ref={ref}
        {...rest}
      >
        <ul className={`header-nav-list ${className}`}>{children}</ul>
      </nav>
    );
  }
);
