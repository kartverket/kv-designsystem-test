import {
	forwardRef,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import type { ButtonProps } from '../button/Button';
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { HeaderDialogTrigger } from "./HeaderDialogTrigger";

export type HeaderSearchButtonProps = ButtonProps;

export const HeaderSearchButton: ForwardRefExoticComponent<
  HeaderSearchButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderSearchButtonProps>(
  function HeaderSearchButton( { className, commandFor='search-dialog', ...rest}, ref) {
    return (
      <HeaderDialogTrigger 
        {...rest}
        ref={ref}
        primaryIcon={MagnifyingGlassIcon}
        label="Søk"
        commandFor={commandFor}
        className={className}
      />
    );
  }
);
