import { forwardRef, type HTMLAttributes } from 'react';

export type DescriptionListTermProps = HTMLAttributes<HTMLElement> & {
  /** For SVG icons, adds a tinted circle and vertically centers the term and description. */
  variant?: 'regular' | 'circle';
};

export const DescriptionListTerm = forwardRef<HTMLElement, DescriptionListTermProps>(
  function DescriptionListTerm({ variant, ...rest }, ref) {
    return <dt ref={ref} {...rest} data-variant={variant} />;
  },
);
