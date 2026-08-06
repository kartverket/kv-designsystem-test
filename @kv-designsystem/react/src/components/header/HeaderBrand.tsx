import { forwardRef } from 'react';
import logoFull from '../../../assets/img/KV_Logo_Horisontal.svg';
import logoSymbol from '../../../assets/img/KV_Logo_Symbol.svg';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

// If applicationName is provided, applicationHref is required
type PublicBrandProps =
  | {
    applicationName?: undefined;
    applicationHref?: string;
  }
  | {
    applicationName: string;
    applicationHref: string;
  }
  ;

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
            {applicationHref ? (
              <Link href={applicationHref}>
                <Heading data-size='2xs'>{applicationName}</Heading>
              </Link>
            ) : (
              <Heading data-size='2xs'>{applicationName}</Heading>
            )}
          </>
        )
        }
      </div>
    );
  }
);

export const InternalBrand = forwardRef<HTMLDivElement, InternalBrandProps>(
  function InternalBrand({ applicationName, applicationHref }, ref) {
    return (
      <div ref={ref}>
        <a href={applicationHref} className='header-brand--internal' >
          <img src={logoSymbol} className='header-logo header-logo--symbol header-logo--internal' aria-hidden />
          <Heading data-size='2xs'>{applicationName}</Heading>
        </a>
      </div>
    );
  }
);
