import cl from 'clsx/lite';
import type { Size } from '@digdir/designsystemet-types';
import { CSSProperties, forwardRef, type HTMLAttributes } from 'react';
import { useState, useEffect, useRef } from 'react';
import './header.css';
import { PublicBrand, InternalBrand } from './HeaderBrand';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * Header variant.
   * @default 'public'
   */
  variant?: 'public' | 'internal';
  /**
   * The name of the application, displayed in the header.
   * 
   * Required for the internal variant. 
   */
  applicationName?: string;
  /**
   * The URL applicationName links to. Set to `null` to disable the link.
   * 
   * Required for the internal variant, and when applicationName is provided for the public variant.
   */
  applicationHref?: string | null;
  /**
   * The maximum width of the header content.
   * Can be any valid CSS width value, e.g. `80rem`, `100%`, etc.
   * Should be the same as for the footer content.
   * @default '1296px'
   */
  maxWidth?: string;
  /**
   * Changes size for descendant Designsystemet components. 
   * Select from predefined sizes.
   */
  'data-size'?: Size;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    variant = 'public',
    applicationName,
    applicationHref,
    children,
    className,
    maxWidth = '1296px',
    ...rest
  },
  ref
) {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 75) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cl('header', (showHeader ? 'visible' : 'hidden'), className)}
      style={{ '--kvdsc-header-max-width': maxWidth } as CSSProperties}
      ref={ref}
      {...rest}
    >
      <div className='header-container'>

        {applicationName && applicationHref ? (
          variant === 'internal' ? (
            <InternalBrand
              applicationName={applicationName}
              applicationHref={applicationHref}
            />
          ) : (
            <PublicBrand
              applicationName={applicationName}
              applicationHref={applicationHref}
            />
          )
        ) : (
          <PublicBrand />
        )}

        {children && <div className='header-content'>{children}</div>}
      </div>
    </header>
  )
});
