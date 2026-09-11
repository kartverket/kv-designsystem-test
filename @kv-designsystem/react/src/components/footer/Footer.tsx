import cl from 'clsx/lite';
import type { Size } from '@digdir/designsystemet-types';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import './footer.css';
import { Logo } from '../logo/Logo';

export type FooterProps = HTMLAttributes<HTMLElement> & {
  /**
   * The maximum width of the footer content.
   * Can be any valid CSS width value, e.g. `1296px`, `100%`, etc.
   * Should be the same as for header content.
   * @default '81rem'
   */
  maxWidth?: string;
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  'data-size'?: Size;
};

export const Footer = forwardRef<HTMLElement, FooterProps>(
  function Footer({ children, className, maxWidth = '1296px', ...rest }, ref) {
    return (
      <footer
        className={cl('footer', className)}
        style={{ '--kvdsc-footer-max-width': maxWidth } as CSSProperties}
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
