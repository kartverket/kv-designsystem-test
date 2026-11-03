import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { format } from 'oxfmt';
import { layoutItemMinWidths } from '../src/components/layout/layoutTokens.ts';

const output = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/components/descriptionList/descriptionListBreakpoints.generated.css',
);

/* The wrapper in descriptionList.css is the named container: the list cannot query its own width.
   CSS cannot put an attribute value or custom property in a container condition, so each supported
   width needs a query paired with the matching data attribute. rem keeps the thresholds font-scalable. */
function generateRules(): string {
  /* The list threshold stacks items; the pair threshold stacks text within each item.
     When both match, the pair variables override the list's subgrid/icon layout. */
  return layoutItemMinWidths
    .map(
      (width) =>
        `@container kvds-description-list (width < calc(${width}rem / 16)) {
  .kvds-description-list[data-list-force-vertical-below='${width}'][data-list-orientation='horizontal'] {
    --kvdsc-description-list-stacked-columns: minmax(0, 1fr);
    --kvdsc-description-list-item-columns: subgrid;
    --kvdsc-description-list-item-column: 1 / -1;
    --kvdsc-description-list-icon-display: grid;
  }

  .kvds-description-list[data-list-force-vertical-below='${width}'][data-list-orientation='horizontal'][data-pair-orientation='horizontal'] {
    grid-template-columns: fit-content(50%) minmax(0, 1fr);
    column-gap: var(--kvdsc-description-list-pair-gap);
  }

  .kvds-description-list[data-pair-force-vertical-below='${width}'][data-pair-orientation='horizontal'] {
    --kvdsc-description-list-item-columns: minmax(0, 1fr);
    --kvdsc-description-list-icon-display: flex;
    --kvdsc-description-list-pair-align: start;
  }
}`,
    )
    .join('\n\n');
}

async function writeCss(): Promise<void> {
  const result = await format(
    output,
    `/* Generated from layoutTokens.ts. Do not edit manually.
   Each query matches a width and its data attribute; descriptionList.css uses the resulting variables. */\n\n${generateRules()}\n`,
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
