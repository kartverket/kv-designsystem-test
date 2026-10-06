import cl from 'clsx/lite';
import { 
  forwardRef, 
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { Button } from '../button/Button';

export type HeaderNavItemProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  /** Text of the navigation link */
  children?: ReactNode;
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
