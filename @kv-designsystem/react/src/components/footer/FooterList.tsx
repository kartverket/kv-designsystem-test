import { forwardRef, HTMLAttributes } from 'react';

export type FooterListProps = HTMLAttributes<HTMLUListElement>;

export const FooterList = forwardRef<HTMLUListElement, FooterListProps>(
  function FooterList({ className, ...rest }, ref) {
    return (
      <ul
        className={`footer-list ${className}`}
        ref={ref}
        {...rest}
      />
    );
  }
);
