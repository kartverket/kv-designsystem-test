import { forwardRef, HTMLAttributes } from 'react';

export type HeaderListProps = HTMLAttributes<HTMLUListElement>;


export const HeaderList = forwardRef<HTMLUListElement, HeaderListProps>(
  function HeaderList({ className, ...rest }, ref) {
    return (
      <ul
        className={`header-list ${className}`}
        ref={ref}
        {...rest}
      />
    );
  }
);
