import { forwardRef } from 'react';
import { ButtonProps, Button } from '../button/Button';


export type HeaderButtonProps = ButtonProps & {
  variant?: 'secondary' | 'tertiary',
};

// 

export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  function HeaderButton({ variant='tertiary', children, ...rest }, ref) {
    return (
      <li className='header-navitem'>
        <Button   
          ref={ref}       
          variant={variant} 
          {...rest} 
        >
          {children}
        </Button>
      </li>
    );
  }
);
