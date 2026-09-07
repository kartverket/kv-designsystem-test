import { forwardRef } from 'react';
import logoFull from '../../../assets/img/KV_Logo_Horizontal.svg';
import logoSymbol from '../../../assets/img/KV_Logo_Symbol.svg';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

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
          <img src={logoFull} className='header-logo header-logo--full' aria-hidden />
          <img src={logoSymbol} className='header-logo header-logo--symbol' aria-hidden />
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
          <img src={logoSymbol} className='header-logo header-logo--symbol header-logo--internal' aria-hidden />
          <Heading data-size='sm'>{applicationName}</Heading>
        </a>
      </div>
    );
  }
);