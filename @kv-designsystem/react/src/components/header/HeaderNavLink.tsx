import { forwardRef } from 'react';
import { LinkProps, Link } from '../link/Link';

export type HeaderNavLinkProps = LinkProps & {

  variant?: 'secondary' | 'tertiary',
};

export const HeaderNavLink = forwardRef<HTMLAnchorElement, HeaderNavLinkProps>(
  function HeaderNavLink({ variant='tertiary', ...props }, ref) {
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
