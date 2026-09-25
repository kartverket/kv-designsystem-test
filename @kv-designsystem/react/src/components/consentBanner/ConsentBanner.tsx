import cl from 'clsx/lite';
import { forwardRef, HTMLAttributes } from 'react';
import { SkipLink } from '../skipLink/SkipLink';
import './consentBanner.css';

export type ConsentBannerProps = HTMLAttributes<HTMLElement> & {
  /**
   * The text displayed for the link that allows users to skip the consent banner.
   * @default 'Hopp over innhold'
   */
  skipLinkText?: string;
};

export const ConsentBanner = forwardRef<HTMLElement, ConsentBannerProps>(
  function ConsentBanner({ children, className, skipLinkText = 'Hopp over innhold', ...rest }, ref) {
    return (
      <> 
      {/*TODO:  Info-ikon må inn her et sted */}
        <section 
          className={cl('consentBanner', className)}
          aria-labelledby='samtykkebanner-tittel' // TODO: burde dette være en valgfri prop med defaultverdi??
          ref={ref}
          {...rest}
        >
          <div className='consentBanner-container'>
          {children}
          </div>
        </section>
        <SkipLink href='#main'>{skipLinkText}</SkipLink>
      </>
    );
});
