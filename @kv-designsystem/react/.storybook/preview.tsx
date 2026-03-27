import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import * as icons from '@navikt/aksel-icons';
import '@digdir/designsystemet-css'; /* imported only once */
// import "@digdir/designsystemet-css/theme"; /* and this */
import '../.storybook/style.css';

// Fix icons being displayed as React.ForwardRef in Storybook code examples
type ForwardRefComponent = {
  displayName?: string;
  render?: {
    displayName?: string;
  };
};

Object.entries(icons).forEach(([name, component]) => {
  if (typeof component === 'object' && component !== null) {
    const comp = component as unknown as ForwardRefComponent;

    comp.displayName = name;

    if (comp.render) {
      comp.render.displayName = name;
    }
  }
});

const preview: Preview = {
  tags: ['autodocs'], // Every component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    // docs: { disable: true }, // Disable docs for all stories. Workaround for .stories Vite HMR bug. Add and remove in order to force refresh page.
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    // docs: {
    //   components: {
    //     h2: Heading,
    //   }
    // }
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
      // const stylesheet = `/style/${context.globals.theme}.css`; // Serve as static file from the public directory.

      return (
        <ThemeWrapper theme={context.globals.theme}>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
};

type Theme = 'green' | 'blue';

const themes: Record<Theme, () => Promise<unknown>> = {
  green: () => import('@kv-designsystem/css/green'),
  blue: () => import('@kv-designsystem/css/blue'),
}

const ThemeWrapper = ({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    themes[theme]();
  }, [theme]);

  return children;
};

export default preview;
