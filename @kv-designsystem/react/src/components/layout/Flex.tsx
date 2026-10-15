import cl from 'clsx/lite';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import './layout.css';
import { toLayoutAttributes, type LayoutItemsMinWidth, type LayoutProps } from './layoutProps';

export type FlexProps = LayoutProps & {
  /**
   * Gives every child a minimum width, in px.
   * - Children grow to fill the row.
   * - When there is not enough room, they wrap to a new line.
   */
  itemsMinWidth?: LayoutItemsMinWidth;
  /**
   * Aligns the children horizontally.
   *
   * Alias for `justify-content`. The CSS property `justify-items` has no effect in flexbox,
   * so the name is reused to match `Grid` and `alignItems`.
   */
  justifyItems?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * Whether the children wrap to a new line when there is not enough room.
   * @default 'wrap'
   */
  flexWrap?: 'wrap' | 'nowrap';
};

/**
 * Places the children side by side horizontally. Use `Grid` to stack content vertically.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { asChild = false, flexWrap, itemsMinWidth, justifyItems, className, ...rest },
  ref,
) {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      className={cl('kvds-flex', className)}
      data-flex-wrap={flexWrap}
      data-items-min-width={itemsMinWidth}
      data-justify-items={justifyItems}
      ref={ref}
      {...toLayoutAttributes(rest)}
    />
  );
});
