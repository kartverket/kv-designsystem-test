import cl from 'clsx/lite';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import './layout.css';
import './layoutTokens.generated.css';
import { toLayoutAttributes, type LayoutProps } from './layoutProps';

export type GridProps = LayoutProps & {
  /**
   * Places the children horizontally.
   *
   * Uses `justify-items` in Grid and `justify-content` in Flex so the visual result and API stay
   * the same for both components.
   * @default 'stretch'
   */
  justify?: 'stretch' | 'start' | 'center' | 'end';
};

/**
 * Arranges children in equally wide columns that fill the available space.
 * Without `itemMinWidth`, it uses one column. Use `Flex` when each child's width should be determined by their content.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { asChild = false, justify, className, ...rest },
  ref,
) {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      className={cl('kvds-grid', className)}
      data-justify={justify}
      ref={ref}
      {...toLayoutAttributes(rest)}
    />
  );
});
