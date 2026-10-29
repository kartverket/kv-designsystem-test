import cl from 'clsx/lite';
import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { Flex } from '../layout/Flex';
import { Grid, type GridProps } from '../layout/Grid';
import type { LayoutItemMinWidth, LayoutSize } from '../layout/layoutProps';
import './descriptionList.css';
import './descriptionListBreakpoints.generated.css';

export type DescriptionListProps = HTMLAttributes<HTMLDListElement> &
  Pick<GridProps, 'gap' | 'rowGap' | 'columnGap'> & {
    /** Horizontal space between the term and description, using the same size tokens as Grid and Flex. */
    pairGap?: LayoutSize;
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

export type DescriptionListItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The term, either text or an SVG icon with an accessible name. */
  term: ReactNode;
  children?: ReactNode;
  /** Adds a tinted circle behind an SVG term. */
  variant?: 'regular' | 'circle';
};

const DescriptionListItem = forwardRef<HTMLDivElement, DescriptionListItemProps>(
  function DescriptionListItem({ term, children, variant, className, ...rest }, ref) {
    return (
      <Flex
        asChild
        flexWrap="nowrap"
        alignItems={variant === 'circle' ? 'center' : 'start'}
        className={cl('kvds-description-list-item', className)}
      >
        <div data-variant={variant} ref={ref} {...rest}>
          <dt>{term}</dt>
          <dd>{children}</dd>
        </div>
      </Flex>
    );
  },
);

export const DescriptionList = Object.assign(
  forwardRef<HTMLDListElement, DescriptionListProps>(function DescriptionList(
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
      ...rest
    },
    ref,
  ) {
    const Layout = listOrientation === 'horizontal' ? Flex : Grid;
    const listStyle: CSSProperties & { '--kvdsc-description-list-pair-gap'?: string } = {
      ...style,
      width: undefined,
      minWidth: undefined,
      maxWidth: undefined,
      '--kvdsc-description-list-pair-gap':
        pairGap === undefined ? undefined : `var(--ds-size-${pairGap})`,
    };

    return (
      <div
        className="kvds-description-list-container"
        style={{
          width: style?.width ?? '100%',
          minWidth: style?.minWidth,
          maxWidth: style?.maxWidth,
        }}
      >
        <Layout
          asChild
          gap={gap}
          rowGap={rowGap}
          columnGap={columnGap}
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
        </Layout>
      </div>
    );
  }),
  { Item: DescriptionListItem },
);
