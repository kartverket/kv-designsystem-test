import type { Preview } from '@storybook/react-vite'

import "@digdir/designsystemet-css"; /* imported only once */
// import "@digdir/designsystemet-css/theme"; /* and this */
import '../.storybook/style.css';

const preview: Preview = {
  tags: ['autodocs'], // Every component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          {
            value: 'green',
            icon: 'circle',
            title: 'Grønn',
          },
          {
            value: 'blue',
            icon: 'circle',
            title: 'Blå',
          },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {

    // Set "theme" to the first theme you want to load when launching Storybook
    theme: 'green',
  },
  decorators: [
    (Story, context) => {
      const stylesheet = `/style/${context.globals.theme}.css`; // Serve as static file from the public directory.
      return (
        <>
          <link rel="stylesheet" href={stylesheet} />
          <Story />
        </>
      );
    },
  ],
};

export default preview;
