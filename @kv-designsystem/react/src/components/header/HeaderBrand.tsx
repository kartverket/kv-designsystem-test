import { forwardRef } from 'react';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';
import { Logo } from '../logo/Logo';

type PublicBrandProps =
  | {
      applicationName?: undefined;
      applicationHref?: undefined;
    }
  | {
      applicationName: string;
      applicationHref: string;
    };

type InternalBrandProps = {
  applicationName: string;
  applicationHref: string;
};

export const PublicBrand = forwardRef<HTMLDivElement, PublicBrandProps>(
  function PublicBrand({ applicationName, applicationHref }, ref) {
    return (
      <div className='header-brand' ref={ref}>
        <a href='https://kartverket.no' aria-label='Kartverket'>
          <Logo padding='0' className='header-logo--full'/>
          <Logo variant='symbol' padding='0'className='header-logo--symbol' />
        </a>
        {applicationName && (
          <>
            <span className='header-brand-divider' />
            <Link href={applicationHref}>
              <Heading data-size='2xs'>{applicationName}</Heading>
            </Link>
          </>
        )}
      </div>
    );
  }
);

export const InternalBrand = forwardRef<HTMLDivElement, InternalBrandProps>(
  function InternalBrand({ applicationName, applicationHref }, ref) {
    return (
      <div ref={ref} className='header-brand header-brand--internal'>
        <a href={applicationHref}>
          <Logo variant='symbol' padding='0' className='header-logo--symbol header-logo--internal' />
          <Heading data-size='sm'>{applicationName}</Heading>
        </a>
      </div>
    );
  }
);
