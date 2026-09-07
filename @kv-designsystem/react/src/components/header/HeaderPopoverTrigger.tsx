import cl from 'clsx/lite';
import {
	forwardRef,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';
import { XMarkIcon } from '@navikt/aksel-icons';

export type HeaderPopoverTriggerProps = ButtonProps & {
	primaryIcon: typeof XMarkIcon;
	label: string;
};

export const HeaderPopoverTrigger: ForwardRefExoticComponent<
	HeaderPopoverTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, HeaderPopoverTriggerProps>(
	function HeaderPopoverTrigger({
		className,
		popovertarget,
		primaryIcon: Icon,
		label,
		...rest
	},
		ref
	) {
		return (
			<Button
				className={cl('header-popover-trigger', className)}
				variant='tertiary'
				popovertarget={popovertarget}
				ref={ref}
				{...rest}
			>
				<span className='popover-trigger-icon'>
					<Icon className='primary-icon' aria-hidden />
					<XMarkIcon className='close-icon' aria-hidden />
				</span>
				<span>{label}</span>
			</Button>
		);
	}
);
