import cl from 'clsx/lite';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type FooterItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & {
  /** Content of the footer column, e.g. a heading and links */
  children?: ReactNode;
};

export const FooterItem = forwardRef<HTMLLIElement, FooterItemProps>(
  function FooterItem({ children, className, ...rest }, ref) {
    return (
      <li 
        className={cl('footer-item', className)}
        ref={ref} 
        {...rest}
      >
        {children}
      </li>
    );
  }
);
