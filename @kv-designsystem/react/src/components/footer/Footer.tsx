import cl from 'clsx/lite';
import type { Size } from '@digdir/designsystemet-types';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import './footer.css';
import logo from '../../../assets/img/KV_Logo_Horisontal.svg';

export type FooterProps = HTMLAttributes<HTMLElement> & {
  /**
   * The maximum width of the footer content.
   * Can be any valid CSS width value, e.g. `80rem`, `100%`, etc.
   * Should be the same as for header content.
   * @default '1296px'
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
        <a href='https://kartverket.no'>
          <img src={logo} alt='Kartverket logo' className='footer-logo' />
        </a>
        <div className='footer-columns'>
          {children}
        </div>
      </div>
    </footer>
  );
});
