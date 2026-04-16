import { forwardRef } from 'react';
import { LinkProps, Link } from '../link/Link';

export type HeaderItemProps = LinkProps & {

  variant?: 'secondary' | 'tertiary',
};

// HeaderItem er alltid en Link
export const HeaderItem = forwardRef<HTMLAnchorElement, HeaderItemProps>(
  function HeaderItem({ variant='tertiary', ...props }, ref) {
    return (
      <li className='header-item'>
        <Link 
          ref={ref}
          className='ds-button' 
          data-variant={variant} 
          {...props} 
        />
      </li>
    );
  }
);
