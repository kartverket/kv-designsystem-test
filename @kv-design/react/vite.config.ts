/// <reference types="vitest/config" />
import { defineConfig, createFilter } from 'vite';
import react from '@vitejs/plugin-react';
import ts from 'typescript';
import tsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import type { Plugin as VitePlugin } from 'vite';


// https://vite.dev/config/
import { dirname, join, resolve} from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import pkg from './package.json';

const __dirname = dirname(fileURLToPath(import.meta.url))

const dependencies = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

/*
Mark submodules from dependencies as being external
*/
const dependenciesSubmodules = dependencies.map(
  (dep) => new RegExp(`^${dep}/`),
);

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), 
    processComponentCss(),
    tsConfigPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
      afterDiagnostic: (diagnostics) => {
        const errors = diagnostics.filter(
          (x) => x.category === ts.DiagnosticCategory.Error,
        );
        if (errors.length > 0) {
          throw new Error(
            'Type error during .d.ts generation! See errors above.',
          );
        }
      },
    }),
  ],
  css: {
    postcss: '../css',
  },
  build: {
    outDir: './dist',
    lib: {
      entry: 'src/components/alpha.ts',
      name: '@kv-design/react',
      fileName: 'alpha',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [...dependencies, ...dependenciesSubmodules],
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      '.storybook': resolve(__dirname, '.storybook'),
      '@kv-design/react': resolve(__dirname, 'src'),
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: join(__dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }], 
  }
});

function processComponentCss(): VitePlugin {
  const componentBase = '**/@kv-design/react/src/components';
  const include = `${componentBase}/**/*.css`;
  const exclude = `${componentBase}/**/*.module.css`;
  const filter = createFilter(include, exclude);

  return {
    name: 'kv-process-component-css',
    transform(code, id) {
      if (!filter(id)) return;

      const isStorybook = process.env.IS_STORYBOOK === 'true';
      if (isStorybook) {
        // Ensure the loaded css is wrapped in a layer the same way as in @kv-design/css/src/index.css
        return `@layer kv.components {\n${code}\n}`;
      } else {
        // Remove the css from the @kv-design/react bundle by returning an empty string.
        // Consumers will load it from @kv-design/css instead.
        return '';
      }
    },
  };
}