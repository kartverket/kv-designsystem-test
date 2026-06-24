import cl from 'clsx/lite';
import { forwardRef, type HTMLAttributes } from 'react';

export type FooterItemProps = HTMLAttributes<HTMLLIElement>;

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
