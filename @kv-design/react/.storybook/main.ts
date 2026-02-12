import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "staticDirs": ['../assets'],
  "framework": "@storybook/react-vite",
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.storybook.json',
      // Required for unions like Size, Color etc from @digdir to generate options in Storybook controls
      shouldExtractLiteralValuesFromEnum: true,
      // Removes "undefined" as an option in Storybook controls for optional properties
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractValuesFromUnion: true,
    },
  },
};
export default config;