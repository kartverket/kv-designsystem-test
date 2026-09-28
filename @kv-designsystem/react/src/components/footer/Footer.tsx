import cl from 'clsx/lite';
import type { Size } from '@digdir/designsystemet-types';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import './footer.css';
import { Logo } from '../logo/Logo';

export type FooterProps = HTMLAttributes<HTMLElement> & {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  'data-size'?: Size;
};

export const Footer = forwardRef<HTMLElement, FooterProps>(
  function Footer({ children, className, ...rest }, ref) {
    return (
      <footer
        className={cl('footer', className)}
        ref={ref}
        {...rest}
      >
        <div className='footer-container'>
          <Logo padding='0' />
          <div className='footer-columns'>
            {children}
          </div>
        </div>
      </footer>
    );
  });
