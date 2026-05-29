import { 
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
 } from 'react';
import type { DialogProps } from '../dialog/Dialog';
import { Dialog } from '../dialog/Dialog';

export type HeaderMenuProps = DialogProps;

export const HeaderMenu: ForwardRefExoticComponent<HeaderMenuProps & RefAttributes<HTMLDialogElement>> 
  = forwardRef<HTMLDialogElement, HeaderMenuProps>(
  function HeaderMenu({ id='header-menu', children, ...rest }, ref) {
    return (
      <Dialog
        id={id}
        className='header-menu'
        placement='top'
        closedby='any'
        closeButton={false}
        ref={ref}
        {...rest}
      >
        <div className='header-menu-content'>
          {children}
        </div>
      </Dialog>
    );
  },
);
