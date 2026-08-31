import cl from 'clsx/lite';
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { Popover, type PopoverProps } from '@digdir/designsystemet-react';

export type HeaderPopoverProps = Omit<PopoverProps, 'placement' | 'variant' | 'autoPlacement'>;

export const HeaderPopover: ForwardRefExoticComponent<
  HeaderPopoverProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, HeaderPopoverProps>(
  function HeaderPopover({ children, className, id = 'header-popover', ...rest }, ref) {
    return (
      <Popover
        id={id}
        className={cl('header-popover', className)}
        placement='none' // sets the position of a popover element relative to its trigger element
        popover='auto'
        ref={ref}
        {...rest}
      >
        <div className='header-dialog-content'>
          {children}
        </div>
      </Popover>
    );
  },
);
