import cl from 'clsx/lite';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import './layout.css';
import './layoutTokens.generated.css';
import { toLayoutAttributes, type LayoutProps } from './layoutProps';

export type FlexProps = LayoutProps & {
  /**
   * Places the children horizontally.
   */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * Whether the children should wrap to a new line when there is not enough room.
   * @default 'wrap'
   */
  flexWrap?: 'wrap' | 'nowrap';
};

/**
 * Arranges children horizontally, using their content width by default.
 * Use `Grid` for equally wide columns that fill the available space.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { asChild = false, flexWrap, justify, className, ...rest },
  ref,
) {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      className={cl('kvds-flex', className)}
      data-flex-wrap={flexWrap}
      data-justify={justify}
      ref={ref}
      {...toLayoutAttributes(rest)}
    />
  );
});
