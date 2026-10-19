import type { HTMLAttributes } from 'react';

type DemoBoxProps = HTMLAttributes<HTMLDivElement> & {
  /** Makes the box taller, so alignItems has something to align. */
  isTall?: boolean;
};

/**
 * A plain box for showing how Flex and Grid place their children.
 */
export function DemoBox({ isTall = false, style, ...rest }: DemoBoxProps) {
  return (
    <div
      style={{
        background: 'var(--ds-color-accent-surface-tinted)',
        border: '1px solid var(--ds-color-accent-border-subtle)',
        borderRadius: 'var(--ds-border-radius-md)',
        color: 'var(--ds-color-accent-text-default)',
        padding: `${isTall ? 'var(--ds-size-8)' : 'var(--ds-size-2)'} var(--ds-size-3)`,
        ...style,
      }}
      {...rest}
    />
  );
}

/**
 * Outlines the container, so maxWidth, alignContent and justifyItems are visible.
 */
export const demoContainerStyle = {
  outline: '1px dashed var(--ds-color-neutral-border-default)',
  minHeight: '16rem',
};
