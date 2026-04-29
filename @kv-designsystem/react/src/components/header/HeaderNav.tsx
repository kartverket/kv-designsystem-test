import { forwardRef, HTMLAttributes } from 'react';

export type HeaderNavProps = HTMLAttributes<HTMLUListElement>;


export const HeaderNav = forwardRef<HTMLUListElement, HeaderNavProps>(
  function HeaderNav({ className, ...rest }, ref) {
    return (
      <nav aria-label='header-navigation'>
        <ul
          className={`header-nav-list ${className}`}
          ref={ref}
          {...rest}
        />
      </nav>
    );
  }
);
