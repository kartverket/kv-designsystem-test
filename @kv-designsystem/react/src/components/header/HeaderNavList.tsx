import { forwardRef, HTMLAttributes } from 'react';

export type HeaderNavListProps = HTMLAttributes<HTMLUListElement>;


export const HeaderNavList = forwardRef<HTMLUListElement, HeaderNavListProps>(
  function HeaderNavList({ className, ...rest }, ref) {
    return (
      <ul
        className={`header-nav-list ${className}`}
        ref={ref}
        {...rest}
      />
    );
  }
);
