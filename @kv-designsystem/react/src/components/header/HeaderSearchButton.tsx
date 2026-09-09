import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { HeaderPopoverTrigger, type HeaderPopoverTriggerProps } from './HeaderPopoverTrigger';

// Omit `primaryIcon` because this component always uses `MagnifingGlassIcon`.
// Omit `label` to redfine as optional. 
export type HeaderSearchButtonProps = Omit<HeaderPopoverTriggerProps, 'primaryIcon' | 'label'> & {
  label?: string;
};

export const HeaderSearchButton: ForwardRefExoticComponent<
  HeaderSearchButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderSearchButtonProps>(
  function HeaderSearchButton({ className, popovertarget = 'search-popover', label = 'Søk', ...rest }, ref) {
    return (
      <HeaderPopoverTrigger
        className={className}
        popovertarget={popovertarget}
        label={label}
        primaryIcon={MagnifyingGlassIcon}
        ref={ref}
        {...rest}
      />
    );
  }
);
