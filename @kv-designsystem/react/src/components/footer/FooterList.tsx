import cl from 'clsx/lite';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type FooterListProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
  /** Should be one or more Footer.Item elements */
  children?: ReactNode;
};

export const FooterList = forwardRef<HTMLUListElement, FooterListProps>(
  function FooterList({ className, ...rest }, ref) {
    return (
      <ul
        className={cl('footer-list', className)}
        ref={ref}
        {...rest}
      />
    );
  }
);
