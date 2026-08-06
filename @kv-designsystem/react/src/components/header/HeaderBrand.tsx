import { forwardRef } from 'react';
import logoFull from '../../../assets/img/KV_Logo_Horisontal.svg';
import logoIcon from '../../../assets/img/KV_Logo_Icon.svg';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

// If applicationName is provided, applicationHref is required
type PublicBrandProps = 
 | {
    variant?: 'public';
    applicationName?: undefined;
    applicationHref?: string;
  }
  | {
    variant?: 'public';
    applicationName: string;
    applicationHref: string;
  }
;

type InternalBrandProps = {
  variant: 'internal';
  applicationName: string;
  applicationHref: string;
};

type HeaderBrandProps = PublicBrandProps | InternalBrandProps;

export const HeaderBrand = forwardRef<HTMLDivElement, HeaderBrandProps>(
  function HeaderBrand(props, ref) {
    return (
      <div className='header-brand' ref={ref}>
        {props.variant === 'internal'
          ? (
            <InternalBrand {...props} />
          ) : (
            <PublicBrand {...props} />
          )}
      </div>
    );
  }
);

function PublicBrand({ applicationName, applicationHref }: PublicBrandProps) {
  return (
    <>
      <a href='https://kartverket.no' aria-label='Kartverket'>
        <img src={logoFull} className='header-logo header-logo--full' aria-hidden />
        <img src={logoIcon} className='header-logo header-logo--icon' aria-hidden />
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
    </>
  );
}

function InternalBrand({ applicationName, applicationHref }: InternalBrandProps) {
  return (
    <>
      <Link
        href={applicationHref}
        className='header-brand--internal'
      >
        <img
          src={logoIcon}
          className='header-logo header-logo--icon'
          aria-hidden
        />
        <Heading data-size='2xs'>{applicationName}</Heading>
      </Link>
    </>
  );
}
