import { forwardRef } from 'react';
import logoFull from '../../../assets/img/KV_Logo_Horisontal.svg';
import logoSymbol from '../../../assets/img/KV_Logo_Symbol.svg';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

type BrandProps = {
  applicationName?: string;
  applicationHref?: string;
};

// Kartverket logo linking to kartverket.no. CSS swaps the full logo for
// the symbol on narrow viewports (header-logo--full / header-logo--symbol).
function KartverketLogoLink() {
  return (
    <a href="https://kartverket.no" aria-label="Kartverket">
      <img src={logoFull} alt="" className="header-logo header-logo--full" />
      <img src={logoSymbol} alt="" className="header-logo header-logo--symbol" />
    </a>
  );
}

// Kartverket logo is its own link; the application name is a separate link,
// separated from the logo.
export const SeparateBrand = forwardRef<HTMLDivElement, BrandProps>(function SeparateBrand(
  { applicationName, applicationHref },
  ref,
) {
  return (
    <div className="header-brand" ref={ref}>
      <KartverketLogoLink />
      {applicationName && applicationHref && (
        <>
          <span className="header-brand-divider" aria-hidden />
          <Link href={applicationHref}>
            <Heading data-size="2xs">{applicationName}</Heading>
          </Link>
        </>
      )}
    </div>
  );
});

// Symbol + application name is merged into one link. With no application, this
// is just the Kartverket logo link.
export const UnifiedBrand = forwardRef<HTMLDivElement, BrandProps>(function UnifiedBrand(
  { applicationName, applicationHref },
  ref,
) {
  if (!applicationName || !applicationHref) {
    return (
      <div className="header-brand" ref={ref}>
        <KartverketLogoLink />
      </div>
    );
  }
  return (
    <div className="header-brand header-brand--unified" ref={ref}>
      <a href={applicationHref}>
        <img src={logoSymbol} alt="" className="header-logo header-logo--unified" />
        <Heading data-size="2xs">{applicationName}</Heading>
      </a>
    </div>
  );
});
