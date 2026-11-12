# Kartverket design-system MCP

A local, read-only MCP server for this checkout's documentation, examples, component code, CSS, tokens and, when installed, the type declarations of re-exported dependencies. Every request reflects the working tree, including uncommitted edits. There is no download, sync step, database, HTTP listener or execution of design-system source code.

## Approved AI tools only

Use this server only with AI tools that Kartverket has approved. The rules are on [ki.kartverket.no](https://ki.kartverket.no/) (Kartverket login). Read them before you connect any AI tool to this repository, and follow them for the data you share and the tools you use. Today that means GitHub Copilot through Kartverket's CPLT setup. This server is only a local data source; it does not make a tool approved.

## Use it offline

With Node.js 22+ already installed, the server and tests need **no network, package installation, `node_modules` or Storybook build**:

```sh
# From the repository root:
node tools/mcp/start.mjs
node --test tools/mcp/test/*.test.mjs
```

The server waits for MCP messages on stdin; the AI client starts it automatically when configured. `runtime.mjs` contains the MCP SDK, schema validation and TypeScript parser. The generated tests use the same `runtime.mjs`, including its MCP client, so they test the code that ships and need nothing else. Third-party licenses are preserved in `THIRD_PARTY_NOTICES.txt`.

## Use it with GitHub Copilot (CPLT)

Set up GitHub Copilot as described on [ki.kartverket.no](https://ki.kartverket.no/) first. Then the server is a normal MCP server of type `stdio`, and the same tools appear in Copilot Chat agent mode in VS Code and in JetBrains IDEs such as IntelliJ.

### VS Code

The checked-in [`.vscode/mcp.json`](../../.vscode/mcp.json) registers the server for this repository:

```json
{
  "servers": {
    "kartverket-design": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/tools/mcp/start.mjs"]
    }
  }
}
```

Open Copilot Chat, choose agent mode, and confirm that `kartverket-design` is listed under the tools. VS Code asks you to trust the server the first time it starts. Nothing else is installed.

### IntelliJ and other JetBrains IDEs

Copilot for JetBrains keeps one personal MCP configuration for all projects and does not expand `${workspaceFolder}`, so the entry needs absolute paths. Print a ready entry for this checkout and this Node installation:

```sh
node tools/mcp/start.mjs --print-config
```

Then, in Copilot Chat in the IDE, switch to agent mode, open the tools menu and choose **Add MCP Tools** (or **Edit MCP configuration**). This opens the personal `mcp.json`, on macOS and Linux at `~/.config/github-copilot/intellij/mcp.json` and on Windows under `%LOCALAPPDATA%\github-copilot\intellij\mcp.json`. Paste the printed `kartverket-design` entry into its `servers` object and save. The IDE starts the server and lists its tools.

### Other repositories and other Copilot hosts

Use the same `stdio` entry with the absolute path to a checkout of this repository, for example the output of `--print-config`. Use an absolute path to `node` if the host does not see your shell `PATH`.

Restart the MCP server in the host after replacing the runtime or changing the command. Editing documentation or `sources.json` takes effect on the next request without rebuilding or restarting. Copilot still uses its own model connection; this server does not make the AI client offline.

Try: "Use kartverket-design to read the Button documentation and props, then build a form with Textfield and Button."

## CSS variables

`get_css_variables` reads custom properties from every indexed `.css` file: the built themes in `@kv-designsystem/theme/dist`, the component CSS in `@kv-designsystem/react/src` and the CSS in dependency folders. Each value comes with its context, the `@layer`, `@media` and selector it is declared under, for example `[data-color-scheme="dark"]` or `[data-color="danger"]`. A query matches names and values; a name match ranks first. The same declaration in a bundle such as `index.css` and in its source file is shown once.

`dependencyRoots` includes `@digdir/designsystemet-css/dist/src`, so the component variables (`--dsc-*`) are available. Its `dist/theme` folder is left out on purpose: it is Digdir's default theme and has other values than the Kartverket themes.

## Props from dependencies

Most components re-export `@digdir/designsystemet-react`, so their props live in that package's `.d.ts` files. `sources.json` lists such packages under `dependencyRoots`. When the folder exists (after `pnpm install`), its ESM declarations, CSS, README, package metadata and license are indexed: `get_component` returns the declarations behind every name the component imports or re-exports as `dependencyTypes`, and `search_docs` searches them too. When the folder is missing, everything else works unchanged, but most components have no props: `get_status` lists the dependency as not installed, and `get_component` says so for each component that imports from it.

The dependency folders exist only after `pnpm install` in the repository root. A checkout that you use only for the MCP, for example from another repository with `--print-config`, needs that install once. The declarations are deliberately not copied into this tool: a copy would have to be regenerated at every Digdir upgrade, and the installed files always match the version the components use. Only declarations and CSS are read; dependency JavaScript is never indexed or executed. A dependency root may be a package-manager symbolic link or a folder inside the package, but it must resolve inside the checkout.

## What requires maintenance?

| Change                                                                              | Required action                                                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Add/edit/delete components, stories, Markdown, MDX or tokens within indexed folders | None; picked up on the next request                                                                |
| Rename a component's Storybook title or change capitalization                       | None; component classification and lookup also use source paths                                    |
| A document gathers stories from several files with their own titles                 | None; stories are joined through the imported example files                                        |
| Add a theme inside an indexed source folder                                         | None; CSS files and token entries are discovered                                                   |
| Upgrade `@digdir/designsystemet-react` or `-css`                                    | None; the installed version's declarations and CSS are indexed                                     |
| Change themes or component CSS                                                      | None; rebuild the theme as usual, CSS variables are read on the next request                       |
| Add, rename or remove a public export                                               | None; exports are read from `entryPoints` on the next request                                      |
| Re-export components from another package                                           | Add its folder to `dependencyRoots` in `sources.json`; no rebuild                                  |
| Move source folders or add a different package to index                             | Update `sources.json`; no rebuild                                                                  |
| Use dynamic or unfamiliar Storybook metadata                                        | Check `get_status` diagnostics; raw source stays searchable and document titles fall back to paths |
| Change MCP TypeScript or dependencies                                               | Run `npm run build`, then `npm test`; keep generated artifacts with the source                     |

Repository paths live in **one runtime configuration file**, `sources.json`. It defines documentation/component/token folders, the text-source allowlist, the public entry points, optional dependency folders and the Storybook URL. Paths must be repository-relative and contained within the checkout. It deliberately is not embedded in the bundle.

There is no fixed component inventory, theme name list or expected component count. Missing optional files, invalid token JSON, duplicate titles and unsupported metadata are reported in diagnostics rather than taking unrelated documentation offline. Duplicate document IDs receive a path-derived suffix; use the IDs returned by discovery tools.

The indexer reads static TypeScript/JavaScript syntax without running it. It handles ordinary object metadata, aliases, static spreads, function stories, named exports, string/regex story filters, MDX namespace imports and literal Meta titles. Fenced code examples are ignored when finding Meta tags. It is intentionally not a full Storybook interpreter: computed metadata and new Storybook APIs may need parser support. Storybook links are inferred from the story IDs and `storybookBaseUrl`; they are not checked against the deployed website.

## Freshness and speed

Every request runs a stat sweep over the indexed folders and compares sizes, timestamps and inodes with the previous index. Unchanged trees are served from memory in a few tens of milliseconds; any change rebuilds the index before answering, so edits, additions and deletions are always visible. Concurrent requests share one rebuild. Nothing is written to disk.

## Tools

| Tool                | Purpose                                                                          |
| ------------------- | -------------------------------------------------------------------------------- |
| `get_status`        | Index time, working-tree hash, coverage, indexed dependencies and diagnostics    |
| `list_documents`    | Find document IDs; filter components or guides                                   |
| `list_exports`      | Everything the package exports, with the import line and the covering document   |
| `search_docs`       | Ranked search across documentation, examples, source, declarations, CSS, tokens  |
| `get_document`      | Markdown/MDX with every Storybook example inlined as code, plus its stories      |
| `get_component`     | Documentation, import line, local implementation and dependency declarations     |
| `get_source`        | Read an indexed file with line pagination                                        |
| `get_css_variables` | CSS variables as applications use them, with values per theme, mode and selector |
| `get_tokens`        | Raw token values, types and source paths; counts per type and a `type` filter    |

## Examples and imports

`get_document` and `get_component` replace `<Canvas of={...} />` and `<Primary />` with the code of that story, and `<Controls />` with a pointer to the props. A story with its own `render` is shown as written. An args-only story is shown as the JSX a user writes, built from the meta `component` and the merged meta and story args; Storybook `fn()` spies and `false` flags are left out. `get_source` still returns the raw MDX and story files.

Each example lists only the imports it uses. A relative import of a name that `entryPoints` exports becomes an import from the package name in the nearest `package.json` (`@kv-designsystem/react`). Other relative imports are marked as local helpers of the example file. Storybook imports are dropped.

`get_component` also finds exports that have no page of their own, such as `Label` on the Typography page or the hooks: it picks the document whose stories are in the export's folder, otherwise the nearest document above it. The current-checkout test fails if a public export has no document or a Storybook example cannot be resolved.

`search_docs` requires every term in the same file and returns the line number and a snippet around the best-matching line. Hits rank by title, headings and number of occurrences. A whole word or identifier counts four times as much as a part of a word, so `label` finds `<Label>` before `aria-label`. A term that is a public export name ranks the file that defines it and the page that documents it first. Files in `dependencyRoots` rank below the design system's own files. `get_component` suggests the closest document names when a name is unknown. Documents are also resources at `kartverket://docs/{id}`. Source references point to local files. Symbolic links are skipped, and arbitrary-file reads and paths escaping the repository are rejected. Token aliases remain unresolved.

## Responses

Each tool result is `{ contentSha256, result }`. The hash changes when an indexed file changes; `get_status` has the index time, coverage and diagnostics. Paths in results are repository-relative and work with `get_source`, which alone also returns the local `file://` URL. Tool descriptions, notes and errors are in English; the documentation itself is in Norwegian.

## Develop in TypeScript

Maintained implementation, launcher, build logic and tests live in `.ts` files. Strict type checking, including unchecked index access, runs before any bundle is written. The only handwritten JavaScript is the small `scripts/build.mjs` bootstrap needed to build on Node 22 without a TypeScript runtime loader.

The tool is isolated from the designsystem's pnpm workspace. Its exact dependencies are in `package-lock.json`; no design-system package or workspace lockfile is changed.

```sh
cd tools/mcp
# Development setup only: uses the network unless dependencies are cached.
npm ci --ignore-scripts
npm run typecheck
npm run build
npm test
# Type-check and compare regenerated output without rewriting it, then test:
npm run check
```

The build and tests are local once development tools are installed. Running the supplied MCP and generated tests needs only Node, even on a fresh checkout with no packages installed.

Generated files: `runtime.mjs`, `start.mjs`, `test/*.mjs`, `build-manifest.json` and `THIRD_PARTY_NOTICES.txt`. Do not edit them manually. Offline tests compare hashes of source, build scripts, lockfile and output to detect stale bundles. New TypeScript files are checked too. `sources.json` and designsystem source edits intentionally do not invalidate the bundle.

The repository Build workflow runs `npm ci --ignore-scripts` and `npm run check` in the step "Verify and test design-system MCP". The check rebuilds the bundle from the lockfile and fails if the checked-in output differs, so an edited `runtime.mjs` cannot pass by also editing `build-manifest.json`. Dependabot proposes dependency updates for this folder; run `npm run build` on its branch and commit the regenerated files. The tests verify `--print-config`, the real MCP handshake/tools/resources with network APIs and subprocess creation blocked, fresh working-tree reads, cache invalidation, metadata variations, duplicate titles, invalid token JSON, root relocation, source boundaries, dependency declarations behind a symbolic link, refused links that escape the checkout, search ranking, name suggestions and documentation coverage in the current checkout. Fixture-based assertions avoid coupling tests to particular component names or counts.

No command here stages, commits, pushes or publishes changes.
