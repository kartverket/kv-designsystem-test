# Kartverket Design System

Design tokens, CSS, and React components for Kartverket products, built on top of [Digdir's Designsystemet](https://www.designsystemet.no/).

[![Build](https://github.com/kartverket/kv-designsystem-test/actions/workflows/build.yml/badge.svg)](https://github.com/kartverket/kv-designsystem-test/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D24.6.0%20%3C25-brightgreen)](package.json)
[![pnpm](https://img.shields.io/badge/pnpm-10.27.0-orange)](package.json)
[![Storybook](https://img.shields.io/badge/storybook-design.kartverket.no-ff4785)](https://design.kartverket.no)

## Overview

This is a pnpm workspace managed with [Nx](https://nx.dev/), publishing a React component library plus supporting CSS and design-token packages. Design tokens are authored with Digdir's [Designsystemet](https://github.com/digdir/designsystemet) CLI and flow downstream into themed CSS, a Tailwind preset, and the React components.

## Packages

| Package | Path | Description | Version |
| --- | --- | --- | --- |
| `@kv-designsystem/react` | [`@kv-designsystem/react`](./@kv-designsystem/react) | React components + Storybook | `1.0.0-alpha.5` |
| `@kv-designsystem/css` | [`@kv-designsystem/css`](./@kv-designsystem/css) | Pure CSS build (PostCSS); exports per-theme CSS and a Tailwind preset | `1.0.0-alpha.4` |
| `@kv-designsystem/theme` | [`@kv-designsystem/theme`](./@kv-designsystem/theme) | Packaged design-token CSS per theme | `1.0.0-alpha.3` |
| `@kv-designsystem/tokens` | [`design-tokens`](./design-tokens) | Design-token source (DTCG), built via the Designsystemet CLI — *private* | — |
| `@internal/build-tools` | [`@internal/build-tools`](./@internal/build-tools) | Shared build/format tooling used across packages — *private* | — |

> [!IMPORTANT]
> All published packages are still pre-1.0 alphas, and the npm publish workflow (`publish-packages.yml`) is currently disabled in CI. None of these packages are live on the public npm registry yet.

> [!NOTE]
> `tsconfig.base.json` and `pnpm-workspace.yaml` also reference `@kv-designsystem/icons`, `@kv-designsystem/symbols`, and `test-app`. These are planned but not yet scaffolded — don't be alarmed if you don't find them.

## Prerequisites

- [Homebrew](https://brew.sh/)
- Node.js (see version below) and [pnpm](https://pnpm.io/) via [Corepack](https://nodejs.org/api/corepack.html)

Install Node with the included [`Brewfile`](./Brewfile):

```sh
brew bundle
```

> [!WARNING]
> Homebrew's `node` formula tracks the latest stable release, which can drift outside the range this repo requires (`>=24.6.0 <25`, see [`package.json`](./package.json)). Check `node -v` after installing — if it's out of range, use a version manager like [`nvm`](https://github.com/nvm-sh/nvm) or [`fnm`](https://github.com/Schniz/fnm) instead.

Then enable Corepack so `pnpm` resolves to the version this repo is pinned to (see `packageManager` in [`package.json`](./package.json)):

```sh
corepack enable
```

## Getting started

```sh
git clone git@github.com:kartverket/kv-designsystem-test.git
cd kv-designsystem-test

brew bundle
corepack enable
pnpm install

# start Storybook for the React package
pnpm --filter @kv-designsystem/react dev
```

## Common commands

| Task | Command |
| --- | --- |
| Install dependencies | `pnpm install` |
| Build everything affected | `pnpm build` |
| Run Storybook (dev) | `pnpm --filter @kv-designsystem/react dev` |
| Build static Storybook | `pnpm --filter @kv-designsystem/react build-storybook` |
| Lint one project | `pnpm nx lint <project>` |
| Lint everything affected | `pnpm nx affected -t lint` |
| Typecheck one project | `pnpm nx typecheck <project>` |
| Check formatting | `pnpm nx format-check` |
| Fix formatting | `pnpm nx format:write` |

> [!NOTE]
> This repo has no root `test`, `lint`, or `dev` script — everything runs through Nx. Use `pnpm nx <target> <project>` for a single package, `pnpm nx affected -t <target...>` to run a target across everything changed relative to `main`, or `pnpm --filter <package> <script>` to call a package's own `package.json` script directly.

## Testing

Component and visual regression tests run through Vitest in browser mode, driven directly from Storybook stories, using Playwright/Chromium as the browser provider.

One-time setup:

```sh
pnpm --filter @kv-designsystem/react exec playwright install chromium
```

Run the tests:

```sh
pnpm --filter @kv-designsystem/react exec vitest run --project storybook
```

| Task | Command |
| --- | --- |
| Run all tests | `pnpm --filter @kv-designsystem/react exec vitest run --project storybook` |
| Interactive UI | `pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui` |
| Filter to one component | `pnpm --filter @kv-designsystem/react exec vitest --project storybook --ui Button` |
| Update snapshots | `pnpm --filter @kv-designsystem/react exec vitest run --project storybook -u` |

> [!TIP]
> Local screenshots are gitignored — they're just for your own iteration. [Chromatic](https://www.chromatic.com/) is the source of truth for cross-machine visual regression and runs in CI on every push and PR to `main`.

## Design tokens

Token source lives in [`design-tokens`](./design-tokens) as DTCG-style JSON and is built with the Designsystemet CLI into CSS, a Tailwind preset, and TypeScript types. Two themes are defined: `green` and `blue`.

```
design-tokens (source, private)
  └─▶ @kv-designsystem/theme (packaged per-theme CSS)
        └─▶ @kv-designsystem/css (re-exports themed CSS + Tailwind preset)
```

## CI/CD

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `build.yml` | Push/PR to `main` | Format check, affected lint/typecheck/build |
| `publish-chromatic.yml` | Push/PR to `main`, manual | Publish Storybook to Chromatic for visual review |
| `deploy-github-pages.yml` | After `build.yml` succeeds on `main` | Deploy Storybook to GitHub Pages ([design.kartverket.no](https://design.kartverket.no)) |
| `publish-packages.yml` | After `build.yml` completes | Publish packages to npm — **currently disabled** |

## Releases

Releases are cut with [Nx Release](https://nx.dev/features/manage-releases): the three publishable packages version together (fixed versioning) based on [Conventional Commits](https://www.conventionalcommits.org/), with an auto-generated GitHub Release changelog.

## Contributing

There's no `CONTRIBUTING.md` yet — for now:

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages; they drive release versioning.
- Fill out the PR template checklist.
- Run `pnpm nx affected -t typecheck lint build` (or just `pnpm build`) before opening a PR — it's what CI runs.

## License

MIT — see [`LICENSE`](./LICENSE).

This design system builds on other open-source design systems; their license notices are collected in [`LICENSES/`](./LICENSES).
