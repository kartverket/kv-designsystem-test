import cl from 'clsx/lite';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import './layout.css';
import { toLayoutAttributes, type LayoutItemsMinWidth, type LayoutProps } from './layoutProps';

export type GridProps = LayoutProps & {
  /**
   * Splits the grid into equally wide columns, each at least this wide, in px.
   * - **Not set:** one column.
   * - **Set:** as many columns as fit.
   * - **Narrow screens:** back to one column.
   */
  itemsMinWidth?: LayoutItemsMinWidth;
  /**
   * Aligns the children horizontally within their column, using `justify-items`.
   * Need `justify-content`? Set it with `style` or `className`.
   * @default 'stretch'
   */
  justifyItems?: 'stretch' | 'start' | 'center' | 'end';
};

/**
 * Stacks the children vertically in one column, or in several equally wide columns with `itemsMinWidth`.
 * Use `Flex` to place content side by side.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { asChild = false, justifyItems, itemsMinWidth, className, ...rest },
  ref,
) {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      className={cl('kvds-grid', className)}
      data-items-min-width={itemsMinWidth}
      data-justify-items={justifyItems}
      ref={ref}
      {...toLayoutAttributes(rest)}
    />
  );
});
