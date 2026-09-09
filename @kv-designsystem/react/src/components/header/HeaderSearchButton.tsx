import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { HeaderDialogTrigger, HeaderDialogTriggerProps } from './HeaderDialogTrigger';

// Omit `primaryIcon` because this component always uses `MagnifingGlassIcon`.
// Omit `label` to redfine as optional. 
export type HeaderSearchButtonProps = Omit<HeaderDialogTriggerProps, 'primaryIcon' | 'label'> & {
  label?: string;
};

export const HeaderSearchButton: ForwardRefExoticComponent<
  HeaderSearchButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderSearchButtonProps>(
  function HeaderSearchButton({ className, commandFor = 'search-dialog', label = 'Søk', ...rest }, ref) {
    return (
      <HeaderDialogTrigger
        className={className}
        commandFor={commandFor}
        label={label}
        primaryIcon={MagnifyingGlassIcon}
        ref={ref}
        {...rest}
      />
    );
  }
);
