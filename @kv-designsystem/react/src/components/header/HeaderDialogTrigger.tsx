import cl from 'clsx/lite';
import {
	forwardRef,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';
import { XMarkIcon } from '@navikt/aksel-icons';

export type HeaderDialogTriggerProps = ButtonProps & {
    primaryIcon: typeof XMarkIcon;
    label: string;
    commandFor: string;
};

export const HeaderDialogTrigger: ForwardRefExoticComponent<
	HeaderDialogTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderDialogTriggerProps>(
	function HeaderDialogTrigger({ 
      className, 
      commandFor, 
      primaryIcon: Icon,
      label, 
      ...rest 
    }, 
    ref
  ) {
		return (
			<Button
				className={cl('header-dialog-trigger', className)} 
				variant='tertiary'
				commandFor={commandFor}
				command='show-modal'
				ref={ref}
				{...rest}
			>
				<span className='dialog-trigger-icon'>
					<Icon className='primary-icon' aria-hidden />
					<XMarkIcon className='close-icon' aria-hidden />
				</span>
				<span>{label}</span>
			</Button>
		);
	}
);
