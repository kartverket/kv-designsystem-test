import cl from 'clsx/lite';
import type { Size } from '@digdir/designsystemet-types';
import { CSSProperties, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import './header.css';
import { PublicBrand, InternalBrand } from './HeaderBrand';

type BaseHeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The maximum width of the header content.
   * Can be any valid CSS width value, e.g. `1296px`, `100%`, etc.
   * Should be the same as for the footer content.
   * @default '81rem'
   */
  maxWidth?: string;
  /**
   * Changes size for descendant Designsystemet components.
   * Select from predefined sizes.
   */
  'data-size'?: Size;
};

/**
 * The brand area supports three valid combinations
 *
 * - `variant="public"` without name/href → Kartverket full logo only
 * - `variant="public"` with name + href → full logo + divider + application link
 * - `variant="internal"` with name + href → Kartverket symbol + application link
 */
export type HeaderProps = BaseHeaderProps &
  (
    | {
        /**
         * Header variant.
         * @default 'public'
         */
        variant?: 'public';
        applicationName?: undefined;
        applicationHref?: undefined;
      }
    | {
        /**
         * Header variant.
         * @default 'public'
         */
        variant?: 'public';
        /** The name of the application, displayed in the header. */
        applicationName: string;
        /** The URL applicationName links to. */
        applicationHref: string;
      }
    | {
        /** Header variant. */
        variant: 'internal';
        /**
         * The name of the application, displayed in the header.
         * Required for the internal variant.
         */
        applicationName: string;
        /**
         * The URL applicationName links to.
         * Required for the internal variant.
         */
        applicationHref: string;
      }
  );

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    variant = 'public',
    applicationName,
    applicationHref,
    children,
    className,
    maxWidth = '81rem',
    ...rest
  },
  ref,
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

  let brand: ReactNode;
  if (variant === 'internal') {
    if (applicationName && applicationHref) {
      brand = <InternalBrand applicationName={applicationName} applicationHref={applicationHref} />;
    } else {
      console.error(
        'Header: variant="internal" krever både applicationName og applicationHref. ' +
          'Faller tilbake til public-visning til begge er satt.',
      );
      brand = <PublicBrand />;
    }
  } else if (applicationName && applicationHref) {
    brand = <PublicBrand applicationName={applicationName} applicationHref={applicationHref} />;
  } else {
    brand = <PublicBrand />;
  }

  return (
    <header
      className={cl('header', showHeader ? 'visible' : 'hidden', className)}
      style={{ '--kvdsc-header-max-width': maxWidth } as CSSProperties}
      ref={ref}
      {...rest}
    >
      <div className="header-container">
        {brand}
        {children && <div className="header-content">{children}</div>}
      </div>
    </header>
  );
});
