import cl from 'clsx/lite';
import { forwardRef, HTMLAttributes } from 'react';
import { SkipLink } from '../skipLink/SkipLink';
import './consentBanner.css';
import { Card } from '../card/Card';

export type ConsentBannerProps = HTMLAttributes<HTMLElement> & {
  /**
   * The text displayed for the link that allows users to skip the consent banner.
   * @default 'Hopp til hovedinnhold'
   */
  skipLinkText?: string;
};

export const ConsentBanner = forwardRef<HTMLElement, ConsentBannerProps>(
  function ConsentBanner({ children, className, skipLinkText = 'Hopp til hovedinnhold', ...rest }, ref) {
    return (
      <>
        <Card asChild data-color='info' variant='tinted' >
          <section
            className={cl('consentBanner', className)}
            aria-labelledby='samtykkebanner-tittel'
            ref={ref}
            {...rest}
          >
            <div className='consentBanner-container'>
              {children}
            </div>
          </section>
        </Card>
        <SkipLink href='#main'>{skipLinkText}</SkipLink>
      </>
    );
  }
);
