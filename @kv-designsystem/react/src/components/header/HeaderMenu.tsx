import { forwardRef } from 'react';
import { DialogProps } from '../dialog/Dialog';
import { Dialog } from '../dialog/Dialog';

export type HeaderMenuProps = DialogProps;

export const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
  function HeaderMenu(
    {
      id='header-menu',
      children, 
      ...rest
    }, 
    ref
  ) {
    return (
      <Dialog
        id={id}
        className='header-menu'
        // popover='auto'
        placement='top'
        closedby='any'
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
