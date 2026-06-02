import { forwardRef } from 'react';
import logoFull from '../../../assets/img/KV_Logo_Horisontal.svg';
import logoIcon from '../../../assets/img/KV_Logo_FAVICON_32x32px.svg';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

type HeaderBrandProps = {
  applicationName?: string;
  applicationHref?: string | null;
};

export const HeaderBrand = forwardRef<HTMLDivElement, HeaderBrandProps>(
  function HeaderBrand({ applicationName, applicationHref }, ref) {
    return (
      <div className='header-brand' ref={ref}>
        <a href='https://kartverket.no'>
          <img src={logoFull} alt='Kartverket logo' className='header-logo header-logo--full' />
          <img src={logoIcon} alt='Kartverket logo' className='header-logo header-logo--icon' />
        </a>

        {applicationName && (
          <>
            <span className='header-divider' />
            {applicationHref ? (
              <Link href={applicationHref}>
                <Heading data-size='2xs'>{applicationName}</Heading>
              </Link>
            ) : (
              <Heading data-size='2xs'>{applicationName}</Heading>
            )}
          </>
        )}
      </div>
    );
  }
);
