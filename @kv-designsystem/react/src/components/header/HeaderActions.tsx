import { forwardRef, HTMLAttributes } from 'react';

export type HeaderActionsProps = HTMLAttributes<HTMLDivElement>;

export const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(
  function HeaderActions({ className, children, ...rest }, ref) {
    return (
      <div
        className={`header-actions ${className ?? ''}`}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
