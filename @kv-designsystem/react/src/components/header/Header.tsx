import { forwardRef, HTMLAttributes } from 'react';
import './Header.css';
import logo from '../../../assets/img/KV_Logo_Horisontal.svg';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName?: string;
  /**
   * The URL the applicationName links to. Set to `null` to disable the link.
   */
  applicationHref?: string | null;
};

type HeaderBrandProps = {
  applicationName?: string;
  applicationHref?: string | null;
};

function HeaderBrand({ applicationName, applicationHref }: HeaderBrandProps) {
  return (
    <div className='header-brand'>
      <a href='https://kartverket.no'>
        <img src={logo} alt='Kartverket logo' className='header-logo' />
      </a>

      {applicationName && (
        <>
          <span className='header-divider' />
          {applicationHref ? (
            <a href={applicationHref}>{applicationName}</a>
          ) : (
            <span>{applicationName}</span>
          )}
        </>
      )}
    </div>
  );
}

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { applicationHref, applicationName, children, className, ...rest},
  ref
) {
  return (
    <header 
      className={`header ${className ?? ''}`}
      ref={ref}
      {...rest}
    >
      <div className='header-content'>
        <HeaderBrand
          applicationName={applicationName}
          applicationHref={applicationHref}
        />

        <div className='header-nav'>
          {children}
        </div>
      </div>
    </header>
  )
});
