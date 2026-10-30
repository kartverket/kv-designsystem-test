import cl from 'clsx/lite';
import type { DefaultProps } from '@digdir/designsystemet-react';
import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { Grid } from '../layout/Grid';
import type { LayoutItemMinWidth, LayoutSize } from '../layout/layoutProps';
import './descriptionList.css';
import './descriptionListBreakpoints.generated.css';

export type DescriptionListProps = HTMLAttributes<HTMLDListElement> & {
  /** Sets the color palette used by circular SVG terms. */
  'data-color'?: DefaultProps['data-color'];
  /** Sets the size of the list and its descendants. */
  'data-size'?: DefaultProps['data-size'];
  /** Space between pairs in both directions when rowGap and columnGap are not set. */
  gap?: LayoutSize;
  /** Space between rows of pairs. Overrides gap. */
  rowGap?: LayoutSize;
  /** Space between columns of pairs. Overrides gap. */
  columnGap?: LayoutSize;
  /** Horizontal space between the term and description, using the same size tokens as Grid and Flex. */
  pairGap?: LayoutSize;
  /** Minimum width of a text term in horizontal pairs of a horizontal list. Takes a CSS length. */
  termMinWidth?: string;
  /** Minimum width of a description in horizontal pairs of a horizontal list. Takes a CSS length. */
  descriptionMinWidth?: string;
  /**
   * Preferred minimum width of each column in a horizontal list with stacked pairs.
   * Horizontal text pairs use termMinWidth, descriptionMinWidth and pairGap instead.
   * Uses the same values as Grid itemMinWidth.
   * @default 350
   */
  itemMinWidth?: LayoutItemMinWidth;
  /**
   * Whether the pairs are stacked or placed side by side.
   * @default 'vertical'
   */
  listOrientation?: 'vertical' | 'horizontal';
  /**
   * Whether the term and description within each pair are side by side or stacked.
   * SVG terms always stay beside their description.
   * @default 'horizontal'
   */
  pairOrientation?: 'vertical' | 'horizontal';
  /**
   * Container width below which a horizontal list displays one pair per row.
   * Uses the same values as Grid and Flex itemMinWidth.
   * @default 400
   */
  listForceVerticalBelow?: LayoutItemMinWidth;
  /**
   * Container width below which horizontal text pairs stack their term and description.
   * SVG terms stay beside their description.
   * Uses the same values as Grid and Flex itemMinWidth.
   * @default 300
   */
  pairForceVerticalBelow?: LayoutItemMinWidth;
};

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList(
    {
      listOrientation = 'vertical',
      pairOrientation = 'horizontal',
      listForceVerticalBelow = 400,
      pairForceVerticalBelow = 300,
      children,
      className,
      style,
      gap,
      rowGap,
      columnGap,
      pairGap,
      termMinWidth,
      descriptionMinWidth,
      itemMinWidth = 350,
      ...rest
    },
    ref,
  ) {
    const listStyle: CSSProperties & {
      '--kvdsc-description-list-pair-gap'?: string;
      '--kvdsc-description-list-term-min-width'?: string;
      '--kvdsc-description-list-description-min-width'?: string;
    } = {
      '--kvdsc-description-list-pair-gap':
        pairGap === undefined ? undefined : `var(--ds-size-${pairGap})`,
      '--kvdsc-description-list-term-min-width': termMinWidth,
      '--kvdsc-description-list-description-min-width': descriptionMinWidth,
    };

    return (
      <div
        className="kvds-description-list-container"
        hidden={rest.hidden}
        style={{
          ...style,
          width: style?.width ?? '100%',
        }}
      >
        <Grid
          asChild
          itemMinWidth={listOrientation === 'horizontal' ? itemMinWidth : undefined}
          rowGap={rowGap ?? gap ?? 3}
          columnGap={columnGap ?? gap ?? 5}
          className={cl('kvds-description-list', className)}
        >
          <dl
            data-list-orientation={listOrientation}
            data-pair-orientation={pairOrientation}
            data-list-force-vertical-below={listForceVerticalBelow}
            data-pair-force-vertical-below={pairForceVerticalBelow}
            ref={ref}
            style={listStyle}
            {...rest}
          >
            {children}
          </dl>
        </Grid>
      </div>
    );
  },
);
