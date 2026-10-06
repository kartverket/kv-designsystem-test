import { Table } from "../../components/table/Table";

const tokensSizes: {
  name: string;
  pxInSm: string;
  pxInMd: string;
  pxInLg: string;
  css: string;
  tailwind: string;
}[] = [
    { name: '0', pxInSm: '0px', pxInMd: '0px', pxInLg: '0px', css: 'var(--ds-size-0)', tailwind: '[p|m]-0' },
    { name: '1', pxInSm: '3px', pxInMd: '4px', pxInLg: '4px', css: 'var(--ds-size-1)', tailwind: '[p|m]-1' },
    { name: '2', pxInSm: '7px', pxInMd: '8px', pxInLg: '9px', css: 'var(--ds-size-2)', tailwind: '[p|m]-2' },
    { name: '3', pxInSm: '10px', pxInMd: '12px', pxInLg: '13px', css: 'var(--ds-size-3)', tailwind: '[p|m]-3' },
    { name: '4', pxInSm: '14px', pxInMd: '16px', pxInLg: '18px', css: 'var(--ds-size-4)', tailwind: '[p|m]-4' },
    { name: '5', pxInSm: '16px', pxInMd: '20px', pxInLg: '23px', css: 'var(--ds-size-5)', tailwind: '[p|m]-5' },
    { name: '6', pxInSm: '21px', pxInMd: '24px', pxInLg: '27px', css: 'var(--ds-size-6)', tailwind: '[p|m]-6' },
    { name: '7', pxInSm: '24px', pxInMd: '28px', pxInLg: '32px', css: 'var(--ds-size-7)', tailwind: '[p|m]-7' },
    { name: '8', pxInSm: '28px', pxInMd: '32px', pxInLg: '37px', css: 'var(--ds-size-8)', tailwind: '[p|m]-8' },
    { name: '9', pxInSm: '32px', pxInMd: '36px', pxInLg: '41px', css: 'var(--ds-size-9)', tailwind: '[p|m]-9' },
    { name: '10', pxInSm: '35px', pxInMd: '40px', pxInLg: '46px', css: 'var(--ds-size-10)', tailwind: '[p|m]-10' },
    { name: '11', pxInSm: '39px', pxInMd: '44px', pxInLg: '51px', css: 'var(--ds-size-11)', tailwind: '[p|m]-11' },
    { name: '12', pxInSm: '42px', pxInMd: '48px', pxInLg: '55px', css: 'var(--ds-size-12)', tailwind: '[p|m]-12' },
    { name: '13', pxInSm: '46px', pxInMd: '52px', pxInLg: '60px', css: 'var(--ds-size-13)', tailwind: '[p|m]-13' },
    { name: '14', pxInSm: '49px', pxInMd: '56px', pxInLg: '65px', css: 'var(--ds-size-14)', tailwind: '[p|m]-14' },
    { name: '15', pxInSm: '53px', pxInMd: '60px', pxInLg: '69px', css: 'var(--ds-size-15)', tailwind: '[p|m]-15' },
    { name: '18', pxInSm: '64px', pxInMd: '72px', pxInLg: '83px', css: 'var(--ds-size-18)', tailwind: '[p|m]-18' },
    { name: '22', pxInSm: '78px', pxInMd: '88px', pxInLg: '102px', css: 'var(--ds-size-22)', tailwind: '[p|m]-22' },
    { name: '26', pxInSm: '92px', pxInMd: '104px', pxInLg: '121px', css: 'var(--ds-size-26)', tailwind: '[p|m]-26' },
    { name: '30', pxInSm: '106px', pxInMd: '120px', pxInLg: '139px', css: 'var(--ds-size-30)', tailwind: '[p|m]-30' },
  ];

const headingSpacing: {
  variant: string;
  top: string;
  toParagraph: string;
  nextHeading: string;
}[] = [
    { variant: 'Heading 2xl (60px)', top: 'size-14 (56px)', toParagraph: 'size-7 (28px)', nextHeading: 'size-8 (32px)' },
    { variant: 'Heading xl (48px)', top: 'size-12 (48px)', toParagraph: 'size-6 (24px)', nextHeading: 'size-7 (28px)' },
    { variant: 'Heading lg (36px)', top: 'size-10 (40px)', toParagraph: 'size-5 (20px)', nextHeading: 'size-6 (24px)' },
    { variant: 'Heading md (30px)', top: 'size-10 (40px)', toParagraph: 'size-4 (16px)', nextHeading: 'size-5 (20px)' },
    { variant: 'Heading sm (24px)', top: 'size-8 (32px)', toParagraph: 'size-3 (12px)', nextHeading: 'size-4 (16px)' },
    { variant: 'Heading xs (21px)', top: 'size-6 (24px)', toParagraph: 'size-2 (8px)', nextHeading: 'size-3 (12px)' },
    { variant: 'Heading 2xs (18px)', top: 'size-4 (16px)', toParagraph: 'size-1 (4px)', nextHeading: '-' },
  ];

const paragraphSpacing: {
  variant: string;
  toParagraph: string;
  toList: string;
  toImage:string;
  captionTop: string;
}[] = [
  { variant: 'Paragraph xl (24px)', toParagraph: 'size-6 (24px)', toList: 'size-4 (16px)', toImage: 'size-6 (24px)', captionTop: 'size-4 (16px)' },
  { variant: 'Paragraph lg (21px)', toParagraph: 'size-5 (20px)', toList: 'size-3 (12px)', toImage: 'size-5 (20px)', captionTop: 'size-4 (16px)' },
  { variant: 'Paragraph md (18px)', toParagraph: 'size-5 (20px)', toList: 'size-3 (12px)', toImage: 'size-5 (20px)', captionTop: 'size-4 (16px)' },
  { variant: 'Paragraph sm (16px)', toParagraph: 'size-4 (16px)', toList: 'size-2 (8px)', toImage: 'size-5 (20px)', captionTop: 'size-3 (12px)' },
  { variant: 'Paragraph xs (14px)', toParagraph: 'size-3 (12px)', toList: 'size-1 (4px)', toImage: 'size-5 (20px)', captionTop: 'size-3 (12px)' },
];

const componentSpacing: {
  component: string;
  horizontal: string;
  vertical: string;
}[] = [
  { component: 'Buttons', horizontal: 'size-4 (16px) i md', vertical: 'size-6 (24px) i md' },
  { component: 'Inputs', horizontal: 'size-4 (16px) i md', vertical: 'size-6 (24px) i md' },
  { component: 'Cards', horizontal: 'size-8 (32px) i md', vertical: 'size-8 (32px)' },
]

function SizingTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <Table zebra>
      <Table.Head>
        <Table.Row>
          {headers.map((h) => (
            <Table.HeaderCell key={h} scope='col'>{h}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((cells) => (
          <Table.Row key={cells[0]}>
            {cells.map((cell, i) => (
              <Table.Cell key={i}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export function TokensSizesTable() {
  return (
    <SizingTable
      headers={['Navn', 'px i small', 'px i medium', 'px i large', 'CSS', 'Tailwind']}
      rows={tokensSizes.map((token) => [
        token.name,
        token.pxInSm,
        token.pxInMd,
        token.pxInLg,
        token.css,
        token.tailwind,
      ])}
    />
  );
}

export function HeadingSpacingTable() {
  return (
    <SizingTable
      headers={[
        'Variant',
        'Over (top) – utenom til en ny Heading',
        'Ned til Paragraph md (bottom)',
        'Ned til et Heading-nivå under (bottom)'
      ]}
      rows={headingSpacing.map((size) => [
        size.variant,
        size.top,
        size.toParagraph,
        size.nextHeading,
      ])}
    />
  );
}

export function ParapgraphSpacingTable() {
  return (
    <SizingTable 
      headers={[
        'Variant',
        'Ned til Paragraph i samme strl',
        'Ned til List i samme strl',
        'Ned til et bilde',
        'Over bildetekst'
      ]}
      rows={paragraphSpacing.map((size) => [
        size.variant,
        size.toParagraph,
        size.toList,
        size.toImage,
        size.captionTop,
      ])}
    />
  );
}

export function ComponentSpacingTable() {
  return (
    <SizingTable 
      headers={[
        'Komponent',
        'Imellom horisontalt',
        'Imellom vertikalt'
      ]}
      rows={componentSpacing.map((component) => [
        component.component,
        component.horizontal,
        component.vertical,
      ])}
    />
  );
}
