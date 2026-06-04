import cl from 'clsx/lite';
import { forwardRef, HTMLAttributes } from 'react';

export type HeaderActionsListProps = HTMLAttributes<HTMLDivElement>;


export const HeaderActionsList = forwardRef<HTMLDivElement, HeaderActionsListProps>(
  function HeaderActionsList({ children, className, ...rest }, ref) {
    return (
      <div 
        className={cl('header-actions-list', className)} 
        ref={ref} 
        {...rest}
      >
        {children}
      </div>
    );
  }
);
