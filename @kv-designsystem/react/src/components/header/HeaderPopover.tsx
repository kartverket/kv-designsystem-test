import cl from 'clsx/lite';
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { Popover, type PopoverProps } from '@digdir/designsystemet-react';

export type HeaderPopoverProps = Omit<
  PopoverProps,
  'placement' | 'variant' | 'autoPlacement'| 'popover'
>;

export const HeaderPopover: ForwardRefExoticComponent<
  HeaderPopoverProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, HeaderPopoverProps>(
  function HeaderPopover({ children, className, id = 'header-popover', ...rest }, ref) {
    return (
      <Popover
        id={id}
        className={cl('header-popover', className)}
        placement='none'
        popover='auto'
        ref={ref}
        {...rest}
      >
        <div className='header-popover-content'>
          {children}
        </div>
      </Popover>
    );
  },
);

// These aliases provide semantic names for the different header use cases
// while sharing the same underlying popover implementation.
export const HeaderMenu = forwardRef<HTMLDivElement, HeaderPopoverProps>(
  function HeaderMenu(props, ref) {
    return <HeaderPopover {...props} ref={ref} />;
});

export const HeaderSearchPopover = forwardRef<HTMLDivElement, HeaderPopoverProps>(
  function HeaderSearchPopover(props, ref) {
    return <HeaderPopover {...props} ref={ref} />
});
