import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { format } from 'oxfmt';
import { layoutItemMinWidths } from '../src/components/layout/layoutTokens.ts';

const output = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/components/descriptionList/descriptionListBreakpoints.generated.css',
);

const listRules = `
  .kvds-description-list[data-list-orientation='horizontal'] {
    display: grid;
  }

  .kvds-description-list[data-list-orientation='horizontal'][data-pair-orientation='horizontal'] {
    grid-template-columns: fit-content(50%) minmax(0, 1fr);
    column-gap: var(--kvdsc-description-list-pair-gap);
  }

  .kvds-description-list[data-list-orientation='horizontal'][data-pair-orientation='horizontal'] > .kvds-description-list-item:not([hidden]) {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }

  .kvds-description-list[data-list-orientation='horizontal'][data-pair-orientation='horizontal'] > .kvds-description-list-item {
    column-gap: inherit;
  }`;

const pairRules = `
  .kvds-description-list[data-list-orientation][data-pair-orientation='horizontal'] {
    grid-template-columns: minmax(0, 1fr);
  }

  .kvds-description-list[data-list-orientation][data-pair-orientation='horizontal'] > .kvds-description-list-item:not([hidden], :has(> dt > svg)) {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: minmax(0, 1fr);
  }

  .kvds-description-list[data-list-orientation][data-pair-orientation='horizontal'] > .kvds-description-list-item:not([hidden]):has(> dt > svg) {
    display: flex;
    grid-column: 1 / -1;
  }`;

function generateRules(attribute: 'list' | 'pair', rules: string): string {
  return layoutItemMinWidths
    .map(
      (width) =>
        `@container kvds-description-list (width < calc(${width}rem / 16)) {\n${rules.replaceAll('.kvds-description-list[', `.kvds-description-list[data-${attribute}-force-vertical-below='${width}'][`)}\n}`,
    )
    .join('\n\n');
}

async function writeCss(): Promise<void> {
  const result = await format(
    output,
    `/* Generated from layoutTokens.ts. Do not edit manually. */\n\n${generateRules('list', listRules)}\n\n${generateRules('pair', pairRules)}\n`,
    { printWidth: 100, singleQuote: true },
  );
  if (result.errors.length > 0)
    throw new Error(result.errors.map((error) => error.message).join('\n'));
  fs.writeFileSync(output, result.code);
  console.log(`Generated ${output}`);
}

writeCss().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
