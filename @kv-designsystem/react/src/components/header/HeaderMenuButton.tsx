import cl from 'clsx/lite';
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { HeaderPopoverTrigger, type HeaderPopoverTriggerProps } from './HeaderPopoverTrigger';

// Omit `primaryIcon` because this component always uses `MenuHamburgerIcon`.
// Omit `label` to redfine as optional. 
export type HeaderMenuButtonProps = Omit<HeaderPopoverTriggerProps, 'primaryIcon' | 'label'> & {
  label?: string;
};

export const HeaderMenuButton: ForwardRefExoticComponent<
  HeaderMenuButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  function HeaderMenuButton({ className, popovertarget = 'menu-popover', label = 'Meny', ...rest }, ref) {
    return (
      <HeaderPopoverTrigger
        className={cl('header-menu-button', className)}
        popovertarget={popovertarget}
        label={label}
        primaryIcon={MenuHamburgerIcon}
        ref={ref}
        {...rest}
      />
    );
  }
);
