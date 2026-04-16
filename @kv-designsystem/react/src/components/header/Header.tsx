import { forwardRef, HTMLAttributes } from 'react';
import './Header.css';
import logo from '../../../assets/img/KV_Logo_Horisontal.svg';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName: string;
  /**
   * The URL the header logo links to. Set to `null` to disable the link.
   * @default '/' (root of the site)
   */
  logoLink?: string | null;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { applicationName, children, className, logoLink = '/', ...rest},
  ref
) {
  return (
    <header 
      className={`header ${className}`}
      ref={ref}
      {...rest}
    >
      <div className='header-content'>
        <div className='header-brand'>
          {/* TODO: add logoLink-prop to a */}
          <a href='https://kartverket.no'>
            <img src={logo} alt='Kartverket logo' className='header-logo' />
          </a>
          <span className='header-divider' />
          {/* TODO: add link to applicationName? */}
          {/* TODO: hva med når vi er på Kartverket.no, da trenger vi ikke tjenestetittel */}
          <span>
            {applicationName}
          </span>
        </div>

        <div className='header-nav'>
          {children}
        </div>
      </div>
    </header>
  )
});
