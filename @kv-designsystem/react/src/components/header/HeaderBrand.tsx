import { forwardRef } from 'react';
import logo from '../../../assets/img/KV_Logo_Horisontal.svg';
import { Link } from '../link/Link';

type HeaderBrandProps = {
  applicationName?: string;
  applicationHref?: string | null;
};

export const HeaderBrand = forwardRef<HTMLDivElement, HeaderBrandProps>(
  function HeaderBrand({ applicationName, applicationHref }, ref) {
    return (
      <div className='header-brand' ref={ref}>
        <a href='https://kartverket.no'>
          <img src={logo} alt='Kartverket logo' className='header-logo' />
        </a>

        {applicationName && (
          <>
            <span className='header-divider' />
            {applicationHref ? (
              <Link href={applicationHref}>{applicationName}</Link>
            ) : (
              <span>{applicationName}</span>
            )}
          </>
        )}
      </div>
    );
  }
);
