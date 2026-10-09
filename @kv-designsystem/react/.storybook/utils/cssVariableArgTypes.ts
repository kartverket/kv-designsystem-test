import type { CSSProperties } from 'react';
import type { InputType } from 'storybook/internal/types';

// Digdir has deprecated some props in favour of CSS variables (see Avatar or AvatarStack).
// CSS variables aren't props, so docgen can't find them.
// Add one to Controls by naming the arg after the variable and giving it cssVariableArgType.
// The story's render function then moves the values into `style` with
// moveCssVariablesToStyle, so the code example shows how to set them.
//
// The default values are copied from Digdir's CSS package (src/<component>.css)
// Check them when updating the @digdir/designsystemet-css dependency.

// A Controls row for a CSS variable. Takes any CSS value, e.g. `8px` or `var(--ds-size-2)`.
export const cssVariableArgType = ({
  description,
  defaultValue,
}: {
  description: string;
  defaultValue: string;
}): InputType => ({
  // Digdir's CSS is in a css layer, so any selector in the consumer's own CSS wins.
  description: `${description} Set it in \`style={{}}\`, or with your own CSS selector targeting the component.`,
  control: { type: 'text' },
  table: {
    type: { summary: 'CSS variable' },
    defaultValue: { summary: defaultValue },
  },
});

// T without its CSS variables, for each member of a union. Mapping over a union directly
// merges the members, so e.g. Avatar's props (which need one of aria-label, data-tooltip or
// aria-hidden) no longer fit the component.
type WithoutCssVariables<T> = T extends unknown
  ? { [K in keyof T as K extends `--${string}` ? never : K]: T[K] }
  : never;

// Moves args named after CSS variables (--*) into `style`, so React sets them on the element
// instead of as attributes. Skips variables that aren't set, so the code example only shows
// the ones chosen in Controls.
export const moveCssVariablesToStyle = <T extends { style?: CSSProperties }>(
  args: T,
): WithoutCssVariables<T> => {
  const props: Record<string, unknown> = {};
  const cssVariables: Record<string, unknown> = {};

  // The values are only sorted here, not used, so `unknown` is enough
  for (const [name, value] of Object.entries(args) as [string, unknown][]) {
    const isCssVariable = name.startsWith('--');
    const isSet = value !== undefined && value !== '';

    if (isCssVariable) {
      if (isSet) cssVariables[name] = value;
    } else {
      props[name] = value;
    }
  }
  if (Object.keys(cssVariables).length > 0) props.style = { ...args.style, ...cssVariables };

  return props as WithoutCssVariables<T>;
};
