import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtemp,
  mkdir,
  cp,
  copyFile,
  writeFile,
  appendFile,
  rm,
  symlink,
  access,
  readFile,
  readdir,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { Client, StdioClientTransport } from '../src/runtime.js';
import { loadCatalog, type Catalog } from '../src/catalog.js';
import type { SourceConfig } from '../src/types.js';

const directory = fileURLToPath(new URL('../', import.meta.url));
const repository = process.env.MCP_TEST_ROOT ?? resolve(directory, '../..');
const config: SourceConfig = {
  documentationRoot: 'docs',
  componentRoots: ['docs/components'],
  tokenRoots: ['tokens'],
  sourceRoots: ['docs', 'tokens', 'styles'],
  additionalFiles: [],
  entryPoints: ['docs/index.ts'],
  dependencyRoots: ['docs/node_modules/@fixture/ui', 'docs/node_modules/@fixture/missing'],
  storybookBaseUrl: 'https://example.invalid/',
};
async function put(root: string, path: string, text: string): Promise<void> {
  await mkdir(dirname(join(root, path)), { recursive: true });
  await writeFile(join(root, path), text);
}
async function fixture(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'kartverket-mcp-test-'));
  await put(root, 'tools/mcp/sources.json', JSON.stringify(config));
  await put(
    root,
    'docs/components/button/Button.stories.tsx',
    "import type { Meta } from '@storybook/react-vite';\nimport { fn } from 'storybook/test';\nimport { Button } from './Button';\nconst base = { title: 'Components/Actions/Button' }; const meta = { ...base, component: Button, args: { size: 'md' }, includeStories: /^(Primary|Secondary)/ } satisfies Meta; export default meta; export const PrimaryButton = { name: 'Primary label', args: { variant: 'primary', children: 'Save', onClick: fn(), disabled: false } }; function SecondaryButton() {} export { SecondaryButton }; export const helper = {};",
  );
  await put(
    root,
    'docs/components/button/ButtonExtra.stories.tsx',
    "import { Button } from './Button';\nimport { helper as h } from '../helpers';\nimport { ArrowIcon } from '@fixture/icons';\nimport helperImage from './image.png';\nexport default { title: 'Components/Actions/Button/Extra' }; export const Loading = { render: () => <Button onClick={h}><ArrowIcon /></Button> };",
  );
  await put(
    root,
    'docs/components/button/Button.mdx',
    "import { Meta as StoryMeta } from '@storybook/addon-docs/blocks';\nimport * as Stories from './Button.stories';\nimport * as Extra from './ButtonExtra.stories';\n<StoryMeta of={Stories} />\n\n# Button documentation\n\nUse the button for actions.\n\n<Primary />\n<Controls />\n\n<Canvas of={Extra.Loading}/>\n",
  );
  await put(
    root,
    'docs/components/button/Button.tsx',
    "import { Button, type ButtonProps } from '@fixture/ui';\nexport type { ButtonProps };\nexport { Button };\n",
  );
  // A component documented on a shared page, found only through the public exports.
  await put(
    root,
    'docs/components/typography/Typography.mdx',
    'import * as LabelStories from \'./label/Label.stories\';\n<Meta title="Components/Typography" />\n\n# Typography\n',
  );
  await put(
    root,
    'docs/components/typography/label/Label.stories.tsx',
    "export default { title: 'Components/Typography/Label' }; export const Preview = {};",
  );
  await put(
    root,
    'docs/components/typography/label/Label.tsx',
    "import type { LabelProps } from '@fixture/missing';\nexport const Label = (props: LabelProps) => null;\n",
  );
  await put(
    root,
    'docs/components/avatar/Avatar.tsx',
    'export const Avatar = () => <span aria-label="a" /><span aria-label="b" /><span aria-label="c" /><i aria-label="d" />;\n',
  );
  await put(
    root,
    'docs/index.ts',
    "export * from './components/button/Button';\nexport { Label } from './components/typography/label/Label';\n",
  );
  await put(root, 'docs/package.json', JSON.stringify({ name: '@fixture/kit' }));
  await put(
    root,
    'docs/Introduction.md',
    '# Introduction\n\nThe button is documented elsewhere.\n',
  );
  await put(
    root,
    'tokens/colors.json',
    JSON.stringify({
      $type: 'color',
      brand: { $value: '#00aa00' },
      radius: { $type: 'dimension', $value: '4px' },
    }),
  );
  await put(
    root,
    'styles/theme.css',
    '@layer theme.light {\n:root, [data-color-scheme="light"] {\n  --ds-color-accent-text: #003;\n  --icon: url("data:image/svg+xml;charset=utf-8,%3Csvg%3E");\n}\n}\n[data-color-scheme="dark"] { --ds-color-accent-text: #ddf; }\n/* --commented: red; */\n:root, [data-color="accent"] { --ds-color-text-default: var(--ds-color-accent-text); }\n',
  );
  // An installed dependency: a real folder reached through a package-manager style symlink.
  await put(
    root,
    'vendor/ui/package.json',
    JSON.stringify({ name: '@fixture/ui', version: '1.2.3' }),
  );
  await put(
    root,
    'vendor/ui/dist/button.d.ts',
    "type ButtonProps = {\n  /** Visual variant */\n  variant?: 'primary' | 'secondary';\n};\ndeclare const Button: (props: ButtonProps) => null;\nexport { Button, ButtonProps };\n",
  );
  await put(
    root,
    'vendor/ui/dist/index.d.ts',
    "export { Button, ButtonProps } from './button.js';\n",
  );
  // Component CSS, also bundled into index.css as packages often do.
  await put(root, 'vendor/ui/dist/button.css', '.ds-button{--dsc-button-padding:var(--ds-size-2)}');
  await put(
    root,
    'vendor/ui/dist/index.css',
    '@layer ui{.ds-button{--dsc-button-padding:var(--ds-size-2)}}',
  );
  await put(
    root,
    'vendor/ui/dist/index.js',
    'export const Button = () => null; // never indexed\n',
  );
  await mkdir(join(root, 'docs/node_modules/@fixture'), { recursive: true });
  await symlink(join(root, 'vendor/ui'), join(root, 'docs/node_modules/@fixture/ui'));
  return root;
}

test('offline generated artifacts match all maintained inputs', async () => {
  const manifest: { inputs: Record<string, string>; outputs: Record<string, string> } = JSON.parse(
    await readFile(join(directory, 'build-manifest.json'), 'utf8'),
  );
  for (const [path, expected] of Object.entries({ ...manifest.inputs, ...manifest.outputs })) {
    const actual = createHash('sha256')
      .update(await readFile(join(directory, path)))
      .digest('hex');
    assert.equal(actual, expected, `${path} changed; rebuild with npm run build.`);
  }
  async function checkInputs(folder: string): Promise<void> {
    for (const item of await readdir(join(directory, folder), { withFileTypes: true })) {
      const path = `${folder}/${item.name}`;
      if (item.isDirectory()) await checkInputs(path);
      else if (item.name.endsWith('.ts'))
        assert.ok(manifest.inputs[path], `${path} is new; rebuild with npm run build.`);
    }
  }
  for (const folder of ['src', 'scripts', 'test']) await checkInputs(folder);
});

test('index tolerates metadata changes, malformed tokens, collisions and relocated source roots', async () => {
  const root = await fixture();
  try {
    const initial = await loadCatalog(root);
    const button = initial.component('Button');
    assert.equal(button.id, 'components-actions-button--docs');
    assert.deepEqual(
      button.stories.map((story) => story.id),
      [
        'components-actions-button--primary-button',
        'components-actions-button--secondary-button',
        'components-actions-button-extra--loading',
      ],
      'stories are joined through the imported example files, not only by title',
    );
    assert.equal(initial.list({ kind: 'component' }).total, 2);
    assert.equal(initial.getTokens().items[0]?.value, '#00aa00');
    assert.deepEqual(initial.getTokens().types, { color: 1, dimension: 1 });
    assert.deepEqual(
      initial.getTokens({ type: 'dimension' }).items.map((token) => token.name),
      ['radius'],
    );
    assert.equal(initial.getTokens({ type: 'dimension' }).types.color, 1);
    assert.deepEqual(initial.status().diagnostics, []);
    // Unchanged files are served from the cached index; any change rebuilds it.
    assert.equal((await loadCatalog(root)).snapshot, initial.snapshot);
    await put(
      root,
      'docs/Dynamic.stories.jsx',
      'export default createDynamicMeta(); export const Example = {}; // Must never execute',
    );
    await put(
      root,
      'docs/Dynamic.mdx',
      '<Meta title={computeTitle()} />\n\n# Dynamic document remains readable\n',
    );
    await put(root, 'tokens/broken.json', '{ incomplete');
    await put(root, 'docs/copyA.mdx', '<Meta title={"Shared title"} />\nA');
    await put(root, 'docs/copyB.mdx', '<Meta title="Shared title" />\nB');
    await put(
      root,
      'docs/WithFence.mdx',
      '```tsx\n<Meta title="Wrong title" />\n```\n\n<Meta title="Correct title" />',
    );
    let catalog = await loadCatalog(root);
    assert.notEqual(catalog.snapshot, initial.snapshot);
    assert.ok(catalog.component('Button').content.includes('Button documentation'));
    assert.ok(catalog.search({ query: 'Dynamic document' }).total > 0);
    assert.ok(catalog.status().diagnostics.some((item) => item.path === 'tokens/broken.json'));
    assert.ok(
      catalog.status().diagnostics.some((item) => item.path === 'docs/Dynamic.stories.jsx'),
    );
    assert.equal(catalog.list({ query: 'Shared title' }).total, 2);
    assert.equal(new Set(catalog.docs.map((doc) => doc.id)).size, catalog.docs.length);
    assert.ok(catalog.document('correct-title--docs'));
    // Diagnostics are not duplicated when the cached snapshot is reused.
    const count = catalog.status().diagnostics.length;
    assert.equal((await loadCatalog(root)).status().diagnostics.length, count);
    await cp(join(root, 'docs'), join(root, 'moved'), { recursive: true });
    await rm(join(root, 'docs'), { recursive: true });
    await put(
      root,
      'tools/mcp/sources.json',
      JSON.stringify({
        ...config,
        documentationRoot: 'moved',
        componentRoots: ['moved/components'],
        sourceRoots: ['moved', 'tokens', 'styles'],
        dependencyRoots: [],
      }),
    );
    catalog = await loadCatalog(root);
    assert.ok(catalog.component('Button').path.startsWith('moved/'));
    await put(
      root,
      'tools/mcp/sources.json',
      JSON.stringify({ ...config, sourceRoots: ['../outside'] }),
    );
    await assert.rejects(loadCatalog(root), /relative path/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('search ranks by relevance, unknown names get suggestions, dependencies expose props', async () => {
  const root = await fixture();
  try {
    const catalog = await loadCatalog(root);
    const hits = catalog.search({ query: 'button documentation' });
    assert.equal(hits.items[0]?.path, 'docs/components/button/Button.mdx');
    assert.equal(hits.items[0]?.line, 6, 'snippet anchors on the heading, not the import lines');
    assert.ok(hits.items[0]?.snippet.includes('# Button documentation'));
    assert.ok((hits.items[0]?.matches ?? 0) >= 2);
    assert.ok(
      (hits.items[0]?.score ?? 0) > (hits.items[1]?.score ?? 0),
      'a heading match outranks a passing mention',
    );
    assert.throws(
      () => catalog.component('Buton'),
      /Did you mean: Button \(components-actions-button--docs\)/,
    );
    assert.throws(() => catalog.component('Intro'), /Introduction/);
    assert.throws(() => catalog.component('zzzz'), /Unknown component: zzzz\. Use/);
    const status = catalog.status();
    assert.deepEqual(
      status.dependencies.map((item) => [item.package, item.indexed, item.version]),
      [
        ['@fixture/ui', true, '1.2.3'],
        ['@fixture/missing', false, undefined],
      ],
    );
    assert.match(status.dependencies[1]?.note ?? '', /Not installed/);
    assert.deepEqual(status.diagnostics, []);
    const button = catalog.component('Button');
    assert.deepEqual(
      button.dependencyTypes.map((item) => [item.package, item.path, item.declares]),
      [
        [
          '@fixture/ui',
          'docs/node_modules/@fixture/ui/dist/button.d.ts',
          ['Button', 'ButtonProps'],
        ],
      ],
      'declaration files are found; re-export barrels and JavaScript are not',
    );
    assert.ok(button.dependencyTypes[0]?.content.includes('Visual variant'));
    assert.doesNotMatch(
      button.note,
      /@fixture\/missing/,
      'Button does not import the missing package',
    );
    assert.match(
      catalog.component('Label').note,
      /props of Label come from @fixture\/missing, which is not indexed.*Not installed/,
    );
    assert.ok(!('sourceUrl' in button) && !('sourceUrl' in (button.implementation[0] ?? {})));
    assert.deepEqual(Object.keys(button.stories[0] ?? {}), ['id', 'name', 'url']);
    assert.equal(
      catalog.search({ query: 'label' }).items[0]?.path,
      'docs/components/typography/label/Label.tsx',
      'a whole-word match outranks repeated aria-label substrings',
    );
    assert.ok(catalog.search({ query: 'Visual variant' }).total === 1);
    assert.ok(
      !Object.hasOwn(catalog.snapshot.files, 'docs/node_modules/@fixture/ui/dist/index.js'),
    );
    // A dependency link that escapes the checkout is refused, and nothing outside is read.
    await symlink('/etc', join(root, 'docs/node_modules/@fixture/outside'));
    await put(
      root,
      'tools/mcp/sources.json',
      JSON.stringify({ ...config, dependencyRoots: ['docs/node_modules/@fixture/outside'] }),
    );
    const escaped = (await loadCatalog(root)).status().dependencies[0];
    assert.equal(escaped?.indexed, false);
    assert.match(escaped?.note ?? '', /escapes repository/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('documents inline examples with package imports and exports resolve shared pages', async () => {
  const root = await fixture();
  try {
    const catalog = await loadCatalog(root);
    const button = catalog.component('Button');
    assert.equal(button.import, "import { Button } from '@fixture/kit';");
    assert.ok(
      button.content.includes(
        'import { Button } from \'@fixture/kit\';\n\n<Button size="md" variant="primary">Save</Button>',
      ),
      '<Primary /> becomes JSX built from meta and story args, without fn() spies or false flags',
    );
    assert.ok(button.content.includes('render: () => <Button onClick={h}><ArrowIcon /></Button>'));
    assert.ok(button.content.includes("import { ArrowIcon } from '@fixture/icons';"));
    assert.ok(
      button.content.includes(
        "// Local helper of the example file, not in the package: import { helper as h } from '../helpers';",
      ),
    );
    assert.ok(!button.content.includes('helperImage'), 'unused imports are left out');
    assert.ok(!/<(Canvas|Primary|Controls)\b/.test(button.content));
    const label = catalog.component('Label');
    assert.equal(label.id, 'components-typography--docs');
    assert.equal(label.import, "import { Label } from '@fixture/kit';");
    assert.deepEqual(
      label.implementation.map((file) => file.path),
      ['docs/components/typography/label/Label.tsx'],
    );
    assert.deepEqual(
      catalog.exports().items.map((item) => [item.name, item.documentId, item.import]),
      [
        ['Button', 'components-actions-button--docs', "import { Button } from '@fixture/kit';"],
        [
          'ButtonProps',
          'components-actions-button--docs',
          "import type { ButtonProps } from '@fixture/kit';",
        ],
        ['Label', 'components-typography--docs', "import { Label } from '@fixture/kit';"],
      ],
    );
    assert.throws(() => catalog.component('Lable'), /Did you mean: Label \(export\)/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('CSS variables keep their selector context and skip comments, strings and bundled copies', async () => {
  const root = await fixture();
  try {
    const catalog = await loadCatalog(root);
    const accent = catalog.cssVariables({ query: 'accent-text' });
    assert.deepEqual(
      accent.items.map((item) => [item.name, item.definitions.map((d) => d.context)]),
      [
        [
          '--ds-color-accent-text',
          ['@layer theme.light › :root, [data-color-scheme="light"]', '[data-color-scheme="dark"]'],
        ],
        ['--ds-color-text-default', [':root, [data-color="accent"]']],
      ],
      'query matches names and values',
    );
    assert.equal(accent.items[1]?.usage, 'var(--ds-color-text-default)');
    assert.deepEqual(
      catalog.cssVariables({ query: 'accent-text', context: 'dark' }).items[0]?.definitions,
      [{ value: '#ddf', context: '[data-color-scheme="dark"]', file: 'styles/theme.css' }],
    );
    assert.equal(
      catalog.cssVariables({ query: '--icon' }).items[0]?.definitions[0]?.value,
      'url("data:image/svg+xml;charset=utf-8,%3Csvg%3E")',
    );
    assert.equal(catalog.cssVariables({ query: 'commented' }).total, 0);
    assert.deepEqual(catalog.cssVariables({ query: 'dsc-button' }).items[0]?.definitions, [
      {
        value: 'var(--ds-size-2)',
        context: '.ds-button',
        file: 'docs/node_modules/@fixture/ui/dist/button.css',
      },
    ]);
    assert.deepEqual(
      catalog.cssVariables({ query: '--ds-color-text-default' }).items.map((item) => item.name),
      ['--ds-color-text-default'],
    );
    assert.deepEqual(
      catalog.cssVariables({ query: 'ds-color-accent-text' }).items.map((item) => item.name),
      ['--ds-color-accent-text', '--ds-color-text-default'],
      'a name match ranks above a value that refers to it',
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('--print-config prints a client entry with absolute paths and does not start a server', async () => {
  const { stdout } = await promisify(execFile)(
    process.execPath,
    [join(directory, 'start.mjs'), '--print-config'],
    { cwd: tmpdir(), timeout: 10000 },
  );
  const parsed: { servers: Record<string, { type: string; command: string; args: string[] }> } =
    JSON.parse(stdout);
  const entry = parsed.servers['kartverket-design'];
  assert.equal(entry?.type, 'stdio');
  assert.equal(entry?.command, process.execPath);
  assert.deepEqual(entry?.args, [join(directory, 'start.mjs')]);
});

test(
  'bundled MCP works without packages/network and sees additions, edits and deletions',
  { timeout: 30000 },
  async () => {
    const root = await fixture();
    const client = new Client({ name: 'offline-test', version: '1' });
    try {
      for (const file of ['start.mjs', 'runtime.mjs'])
        await copyFile(join(directory, file), join(root, 'tools/mcp', file));
      await assert.rejects(access(join(root, 'tools/mcp/node_modules')));
      await client.connect(
        new StdioClientTransport({
          command: process.execPath,
          args: [
            '--import',
            join(directory, 'test/deny-network.mjs'),
            join(root, 'tools/mcp/start.mjs'),
          ],
          cwd: tmpdir(),
          stderr: 'pipe',
        }),
      );
      assert.ok(client.getServerCapabilities()?.resources);
      assert.equal((await client.listTools()).tools.length, 9);
      async function call<T>(
        name: string,
        args: Record<string, unknown> = {},
      ): Promise<{ contentSha256: string; result: T }> {
        const result = await client.callTool({ name, arguments: args });
        assert.ok(!result.isError, JSON.stringify(result));
        assert.ok(Array.isArray(result.content));
        const first = result.content[0];
        assert.ok(first && first.type === 'text');
        const data = JSON.parse(first.text) as { contentSha256: string; result: T };
        assert.deepEqual(Object.keys(data), ['contentSha256', 'result'], 'no repeated metadata');
        return data;
      }
      const initial = await call<ReturnType<Catalog['status']>>('get_status');
      assert.equal(initial.result.offline, true);
      const button = (
        await call<ReturnType<Catalog['component']>>('get_component', { name: 'Button' })
      ).result;
      assert.ok(button.implementation[0]?.content.includes('Button'));
      assert.deepEqual(button.dependencyTypes[0]?.declares, ['Button', 'ButtonProps']);
      assert.equal(
        (await call<ReturnType<Catalog['source']>>('get_source', { path: button.path, limit: 2 }))
          .result.nextLine,
        3,
      );
      assert.ok(
        (await call<ReturnType<Catalog['search']>>('search_docs', { query: 'Button' })).result
          .total > 0,
      );
      assert.equal((await call<ReturnType<Catalog['getTokens']>>('get_tokens')).result.total, 2);
      assert.equal(
        (await call<ReturnType<Catalog['getTokens']>>('get_tokens', { type: 'color' })).result
          .total,
        1,
      );
      assert.equal(
        (await call<ReturnType<Catalog['exports']>>('list_exports')).result.items[0]?.name,
        'Button',
      );
      assert.equal(
        (
          await call<ReturnType<Catalog['cssVariables']>>('get_css_variables', {
            query: 'text-default',
          })
        ).result.total,
        1,
      );
      assert.equal(
        (await call<ReturnType<Catalog['list']>>('list_documents', { limit: 1 })).result.nextOffset,
        1,
      );
      await appendFile(join(root, button.path), '\nOfflineFreshEditMarker');
      const updated = await call<ReturnType<Catalog['document']>>('get_document', {
        id: button.id,
      });
      assert.ok(updated.result.content.includes('OfflineFreshEditMarker'));
      assert.notEqual(updated.contentSha256, initial.contentSha256);
      await put(root, 'docs/New.mdx', '<Meta title="New page" />\n# New page');
      assert.ok(
        (await client.listResources()).resources.some(
          (item) => item.uri === 'kartverket://docs/new-page--docs',
        ),
      );
      const resource = await client.readResource({ uri: 'kartverket://docs/new-page--docs' });
      assert.ok(
        resource.contents[0] &&
          'text' in resource.contents[0] &&
          resource.contents[0].text.includes('# New page'),
      );
      await rm(join(root, 'docs/New.mdx'));
      assert.equal(
        (await call<ReturnType<Catalog['list']>>('list_documents', { query: 'New page' })).result
          .total,
        0,
      );
      await symlink('/etc/passwd', join(root, 'docs/leaked.md'));
      for (const path of ['/etc/passwd', '../outside', '__proto__', 'docs/leaked.md'])
        assert.equal(
          (await client.callTool({ name: 'get_source', arguments: { path } })).isError,
          true,
        );
      for (const args of [{ offset: -1 }, { limit: 100000 }])
        assert.equal(
          (await client.callTool({ name: 'list_documents', arguments: args })).isError,
          true,
        );
      const unknown = await client.callTool({
        name: 'get_component',
        arguments: { name: 'Buton' },
      });
      assert.equal(unknown.isError, true);
      assert.match(JSON.stringify(unknown.content), /Did you mean: Button/);
    } finally {
      await client.close();
      await rm(root, { recursive: true, force: true });
    }
  },
);

test('current checkout documentation remains discoverable without fixed component counts', async () => {
  const root = await mkdtemp(join(tmpdir(), 'kartverket-mcp-checkout-'));
  try {
    const actualConfig: SourceConfig = JSON.parse(
      await readFile(join(directory, 'sources.json'), 'utf8'),
    );
    await put(root, 'tools/mcp/sources.json', JSON.stringify(actualConfig));
    for (const path of [...actualConfig.sourceRoots, ...actualConfig.additionalFiles]) {
      try {
        await cp(join(repository, path), join(root, path), { recursive: true });
      } catch (error) {
        if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
      }
    }
    const catalog = await loadCatalog(root);
    const docs = Object.keys(catalog.snapshot.files).filter(
      (path) => path.startsWith(`${actualConfig.documentationRoot}/`) && /\.mdx?$/.test(path),
    );
    assert.ok(docs.length > 0);
    assert.equal(catalog.docs.length, docs.length);
    for (const doc of catalog.docs) assert.ok(catalog.document(doc.id).content.length > 0);
    // Every story file imported by a document must contribute stories to it.
    for (const doc of catalog.docs) {
      const document = catalog.document(doc.id);
      for (const example of document.examples)
        if (
          /\.stories\./.test(example) &&
          catalog.snapshot.entries.some((entry) => entry.path === example)
        )
          assert.ok(
            document.stories.some(
              (story) =>
                catalog.snapshot.entries.find((entry) => entry.id === story.id)?.path === example,
            ),
            `${doc.id} lists ${example} but none of its stories`,
          );
    }
    // Every Storybook block is replaced by code, and every public export leads to documentation.
    for (const doc of catalog.docs)
      assert.ok(
        !/<(Canvas|Primary)\b/.test(
          catalog.document(doc.id).content.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''),
        ),
        `${doc.id} has an example the indexer cannot resolve`,
      );
    assert.ok(catalog.snapshot.exports.length > 0, 'no public exports; check entryPoints');
    if (Object.keys(catalog.snapshot.files).some((path) => path.endsWith('.css')))
      assert.ok(catalog.snapshot.cssVariables.length > 0, 'CSS is indexed but has no variables');
    for (const item of catalog.snapshot.exports.filter((item) => item.kind === 'value'))
      assert.doesNotThrow(() => catalog.component(item.name), `${item.name} has no documentation`);
    // With workspace dependencies installed, re-exported components expose their props.
    const live = await loadCatalog(repository);
    if (live.snapshot.dependencies.some((dependency) => dependency.indexed)) {
      const components = live.list({ kind: 'component', limit: 100 }).items;
      assert.ok(
        components.some(
          (item) => live.component(item.title.split('/').at(-1) ?? '').dependencyTypes.length > 0,
        ),
        'no component exposes dependency type declarations although a dependency is indexed',
      );
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
