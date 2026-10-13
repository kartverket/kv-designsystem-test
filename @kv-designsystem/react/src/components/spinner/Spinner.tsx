import {
  Spinner as DigdirSpinner,
  type DefaultProps,
  type SpinnerProps as DigdirSpinnerProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

// Digdir types Spinner with SVG attributes, which don't include data-color, even though
// the spinner supports it. Declared here so it's typed and shows up in Storybook Controls.
type SpinnerProps = DigdirSpinnerProps & {
  /**
   * Changes the color of the spinner.
   */
  'data-color'?: DefaultProps['data-color'];
};

const Spinner = DigdirSpinner as ForwardRefExoticComponent<
  SpinnerProps & RefAttributes<ComponentRef<typeof DigdirSpinner>>
>;

export type { SpinnerProps };
export { Spinner };
