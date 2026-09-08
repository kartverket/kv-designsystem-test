// TypeScript's `noUncheckedSideEffectImports` (default since TS 6.0) requires every
// package.json `exports` subpath that gets side-effect-imported (e.g.
// `import '@kv-designsystem/css/green'`) to resolve to type declarations, even
// though CSS-files have nothing to type. This file exists only so that resolution
// succeeds. It intentionally declares no real types.
//
// Copy this file into a package's `dist` during build and point the relevant
// `exports` subpath's `types` condition to the dist file.
export {};
