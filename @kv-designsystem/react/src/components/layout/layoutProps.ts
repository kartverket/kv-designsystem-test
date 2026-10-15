import type { CSSProperties, HTMLAttributes } from 'react';

/**
 * Size tokens from Designsystemet. `4` means `var(--ds-size-4)`.
 */
export type LayoutSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 18 | 22 | 26 | 30;

/**
 * Minimum width of the children, in px (converted to rem, so it follows the user's font size).
 */
export type LayoutItemsMinWidth = 50 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500 | 550 | 600;

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Space between rows and columns. The number refers to the corresponding css variable `--ds-size-N`.
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
   * Aligns the children vertically within their row.
   */
  alignItems?: 'stretch' | 'start' | 'center' | 'end' | 'baseline';
  /**
   * Distributes the rows vertically when the container is taller than its content.
   */
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * Maximum width of the container. Takes any CSS length, e.g. `40rem`, `80ch` or `var(--kvds-frame-content-max-width)`.
   * Also centers the container and adds the same padding on each side as `Header` and `Footer`.
   * Change the padding with the CSS variable `--kvdsc-layout-padding-inline`.
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
  alignItems,
  alignContent,
  maxWidth,
  style,
  ...rest
}: P) {
  return {
    ...rest,
    'data-gap': gap,
    'data-row-gap': rowGap,
    'data-column-gap': columnGap,
    'data-align-items': alignItems,
    'data-align-content': alignContent,
    'data-max-width': maxWidth === undefined ? undefined : '',
    style:
      maxWidth === undefined
        ? style
        : ({ '--kvdsc-layout-max-width': maxWidth, ...style } as CSSProperties),
  };
}
