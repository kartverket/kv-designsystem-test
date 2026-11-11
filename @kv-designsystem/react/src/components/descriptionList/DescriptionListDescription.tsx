import { forwardRef, type HTMLAttributes } from 'react';

export type DescriptionListDescriptionProps = HTMLAttributes<HTMLElement>;

export const DescriptionListDescription = forwardRef<HTMLElement, DescriptionListDescriptionProps>(
  function DescriptionListDescription(props, ref) {
    return <dd ref={ref} {...props} />;
  },
);
