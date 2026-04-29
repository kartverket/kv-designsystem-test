import { forwardRef, HTMLAttributes } from 'react';
import './Header.css';
import { HeaderBrand } from './HeaderBrand';
import { useState, useEffect } from 'react';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName?: string;
  /**
   * The URL applicationName links to. Set to `null` to disable the link.
   */
  applicationHref?: string | null;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { applicationHref, applicationName, children, className,  ...rest},
  ref
) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Show header when scrolling up, hide when scrolling down
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }

        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

  return (
    <header className={`header ${showHeader ? "visible" : "hidden"} ${className ?? ''}`} ref={ref} {...rest}>
      <div className='header-container'>

        <HeaderBrand
          applicationName={applicationName}
          applicationHref={applicationHref}
        />

        {children && <div className='header-content'>{children}</div> }
      </div>
    </header>
  )
});
