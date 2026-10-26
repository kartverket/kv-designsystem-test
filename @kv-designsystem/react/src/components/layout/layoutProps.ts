import type { CSSProperties, HTMLAttributes } from 'react';
import { layoutItemMinWidths, layoutSizes } from './layoutTokens';

/**
 * Size tokens from Designsystemet. `4` means `var(--ds-size-4)`.
 */
export type LayoutSize = (typeof layoutSizes)[number];

/**
 * Preferred width of each child before items wrap, in px. It is converted to rem, so it follows
 * the user's font size.
 */
export type LayoutItemMinWidth = (typeof layoutItemMinWidths)[number];

type LayoutStyle = CSSProperties & {
  '--kvdsc-layout-max-width'?: string;
};

type LayoutAttributes<P extends LayoutProps> = Omit<
  P,
  | 'gap'
  | 'rowGap'
  | 'columnGap'
  | 'itemMinWidth'
  | 'alignItems'
  | 'alignContent'
  | 'maxWidth'
  | 'style'
> & {
  'data-align-content': LayoutProps['alignContent'];
  'data-align-items': LayoutProps['alignItems'];
  'data-column-gap': LayoutProps['columnGap'];
  'data-gap': LayoutProps['gap'];
  'data-item-min-width': LayoutProps['itemMinWidth'];
  'data-max-width': '' | undefined;
  'data-row-gap': LayoutProps['rowGap'];
  style: LayoutStyle | undefined;
};

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Space between rows and columns. The number refers to the number in the css variable `--ds-size-N`.
   * @default 4
   */
  gap?: LayoutSize;
  /**
   * Space between rows. Overrides `gap` vertically.
   */
  rowGap?: LayoutSize;
  /**
   * Space between columns. Overrides `gap` horizontally.
   */
  columnGap?: LayoutSize;
  /**
   * Preferred width of each child before items wrap, in px.
   */
  itemMinWidth?: LayoutItemMinWidth;
  /**
   * Aligns the children vertically within their row.
   */
  alignItems?: 'stretch' | 'start' | 'center' | 'end' | 'baseline';
  /**
   * Distributes the rows vertically when the container is taller than its content.
   */
  alignContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /**
   * Maximum width of the container. Takes any CSS length, e.g. `40rem`, `80ch` or `var(--kvds-frame-content-max-width)`.
   * Also centers the container and keeps the same space free on each side as `Header` and `Footer`.
   */
  maxWidth?: string;
  /**
   * Renders the child element instead of a `div`, and merges the props and classes onto it.
   * @default false
   */
  asChild?: boolean;
};

/**
 * Turns the shared layout props into the data attributes and CSS variable the CSS in layout.css reads.
 * Returns the remaining props untouched.
 */
export function toLayoutAttributes<P extends LayoutProps>({
  gap,
  rowGap,
  columnGap,
  itemMinWidth,
  alignItems,
  alignContent,
  maxWidth,
  style,
  ...rest
}: P): LayoutAttributes<P> {
  return {
    ...rest,
    'data-gap': gap,
    'data-row-gap': rowGap,
    'data-column-gap': columnGap,
    'data-item-min-width': itemMinWidth,
    'data-align-items': alignItems,
    'data-align-content': alignContent,
    'data-max-width': maxWidth === undefined ? undefined : '',
    style:
      maxWidth === undefined
        ? style
        : ({ '--kvdsc-layout-max-width': maxWidth, ...style } satisfies LayoutStyle),
  };
}
