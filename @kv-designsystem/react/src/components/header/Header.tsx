import { forwardRef, HTMLAttributes } from 'react';
import './Header.css';
import { HeaderBrand } from './HeaderBrand';

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
  

  return (
    <header className={`header ${className ?? ''}`} ref={ref} {...rest}>
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
