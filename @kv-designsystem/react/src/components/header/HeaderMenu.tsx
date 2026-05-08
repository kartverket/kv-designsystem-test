import { forwardRef } from 'react';
import { DropdownProps } from '../dropdown/Dropdown';
import { Dropdown } from '../dropdown/Dropdown';

export type HeaderMenuProps = DropdownProps;

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
      <Dropdown
        id={id}
        className='header-menu'
        popover='auto'
        placement='bottom-start'
        ref={ref}
        {...rest}
      >
        <div className='header-menu-content'>
          {children}
        </div>
      </Dropdown>
    );
  },
);
