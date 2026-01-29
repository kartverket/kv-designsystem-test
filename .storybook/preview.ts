import type { Preview } from '@storybook/react-vite'

import "@digdir/designsystemet-css"; /* imported only once */
// import "@digdir/designsystemet-css/theme"; /* and this */
import "../design-tokens-build/theme.css" /* or your own theme */
import '../.storybook/style.css';

const preview: Preview = {
  tags: ['autodocs'], // Every component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;