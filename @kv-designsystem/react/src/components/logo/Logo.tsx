import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import logoHorizontal from '../../../assets/img/KV_Logo_Horizontal.svg';
import logoHorizontalNegative from '../../../assets/img/KV_Logo_Horizontal_Negative.svg';
import logoVertical from '../../../assets/img/KV_Logo_Vertical.svg';
import logoVerticalNegative from '../../../assets/img/KV_Logo_Vertical_Negative.svg';
import logoSymbol from '../../../assets/img/KV_Logo_Symbol.svg';
import './logo.css';

export type LogoProps = HTMLAttributes<HTMLElement> & {
  /**
   * Changes the logo variant.
   * @default 'horizontal'
   */
  variant?: 'horizontal' | 'vertical' | 'symbol';
  /**
   * Changes height of the logo, the width scales accordingly
   * Can be any valid CSS length value, e.g. `40px`, `3rem`, etc.
   * @default 'var(--ds-size-10)'
   */
  size?: string;
  /**
   * Changes padding on all sides of the logo
   * @default 'var(--ds-size-5)'
   */
  padding?: string;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  function Logo(
    {
      variant = 'horizontal',
      size = 'var(--ds-size-10)',
      padding = 'var(--ds-size-5)',
      style,
      ...rest
    },
    ref,
  ) {
    const logoAlt = 'Kartverket';

    return (
      <div
        className={`kvds-logo kvds-logo--${variant}`}
        ref={ref}
        {...rest}
        style={
          {
            '--kvdsc-logo-size': size,
            '--kvdsc-logo-padding': padding,
            ...style,
          } as React.CSSProperties
        }
      >
        {variant === 'horizontal' ? (
          <>
            <img src={logoHorizontal} alt={logoAlt} />
            <img src={logoHorizontalNegative} alt={logoAlt} />
          </>
        ) : variant === 'vertical' ? (
          <>
            <img src={logoVertical} alt={logoAlt} />
            <img src={logoVerticalNegative} alt={logoAlt} />
          </>
        ) : (
          <img src={logoSymbol} alt={logoAlt} />
        )}
      </div>
    );
  }
);
