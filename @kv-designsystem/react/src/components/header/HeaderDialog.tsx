import cl from 'clsx/lite';
import { 
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
 } from 'react';
import type { DialogProps } from '../dialog/Dialog';
import { Dialog } from '../dialog/Dialog';

export type HeaderDialogProps = DialogProps;

export const HeaderDialog: ForwardRefExoticComponent<HeaderDialogProps & RefAttributes<HTMLDialogElement>> 
  = forwardRef<HTMLDialogElement, HeaderDialogProps>(
  function HeaderDialog({ children, className, id='header-dialog',  ...rest }, ref) {
    return (
      <Dialog
        id={id}
        className={cl('header-dialog', className)} 
        placement='top'
        closedby='any'
        closeButton={false}
        ref={ref}
        {...rest}
      >
        <div className='header-dialog-content'>
          {children}
        </div>
      </Dialog>
    );
  },
);
