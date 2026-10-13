import cl from 'clsx/lite';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type HeaderActionsListProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The header's actions, e.g. buttons for search, menu and login */
  children?: ReactNode;
};

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
