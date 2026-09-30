import cl from 'clsx/lite';
import { 
  forwardRef, 
  type AnchorHTMLAttributes,
} from 'react';
import { Button } from '../button/Button';

export type HeaderNavItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  'data-show-from'?: 'sm' | 'md' | 'lg';
  'data-hide-from'?: 'sm' | 'md' | 'lg';
};

export const HeaderNavItem = forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
  function HeaderNavItem({ 
    children,
    className,
    'data-show-from': showFrom,
    'data-hide-from': hideFrom,
    ...anchorProps
  },
  ref
) {
    return (
      <li 
        className={cl('header-nav-item', className)}
        data-show-from={showFrom}
        data-hide-from={hideFrom}
      >
        <Button asChild variant='tertiary'>
          <a ref={ref} {...anchorProps}>
            {children}
          </a>
        </Button>
      </li>
    );
  }
);
