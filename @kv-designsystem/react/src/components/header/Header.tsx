import cl from 'clsx/lite';
import type { Size } from '@digdir/designsystemet-types';
import { CSSProperties, forwardRef, type HTMLAttributes, useEffect, useRef, useState } from 'react';
import './header.css';
import { SeparateBrand, UnifiedBrand } from './HeaderBrand';

// Application name and href must be provided together, or none of them.
type ApplicationLink =
  | { applicationName?: undefined; applicationHref?: undefined }
  | {
      /** The name of the application, displayed in the header link. */
      applicationName: string;
      /** URL for the application. */
      applicationHref: string;
    };

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * Whether the Kartverket logo is its own link area, pointing to
   * kartverket.no and shown next to the application name (with a divider between).
   * When `false`, the symbol and application name form a single link to the
   * application. If no application name is providet, only the Kartverket logo is shown, linking to kartverket.no.
   * @default true
   */
  separateBrand?: boolean;
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
} & ApplicationLink;

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    separateBrand = true,
    applicationName,
    applicationHref,
    children,
    className,
    maxWidth = '1296px',
    ...rest
  },
  ref,
) {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down, show on scroll up (past a small threshold).
      setShowHeader(!(currentScrollY > lastScrollY.current && currentScrollY > 75));
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cl('header', showHeader ? 'visible' : 'hidden', className)}
      style={{ '--kvdsc-header-max-width': maxWidth } as CSSProperties}
      ref={ref}
      {...rest}
    >
      <div className="header-container">
        {separateBrand ? (
          <SeparateBrand applicationName={applicationName} applicationHref={applicationHref} />
        ) : (
          <UnifiedBrand applicationName={applicationName} applicationHref={applicationHref} />
        )}
        {children && <div className="header-content">{children}</div>}
      </div>
    </header>
  );
});
