import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, type CSSProperties } from 'react';
import { Grid } from './Grid';
import { Flex } from './Flex';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Search } from '../search/Search';
import { Tag } from '../tag/Tag';
import { Textfield } from '../textfield/Textfield';
import { Fieldset } from '../fieldset/Fieldset';

const meta = {
  component: Grid,
  title: 'Components/Layout/Grid',
  tags: ['!autodocs'],
  argTypes: {
    // asChild needs exactly one child, so toggling it in the controls will crash the story
    asChild: { control: false },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const services = [
  { name: 'Norgeskart', description: 'Finn landkart, turkart, sjøkart og stedsnavn på ett sted.' },
  { name: 'Stedsnavn', description: 'Kartverkets innsynstjeneste for stedsnavn.' },
  { name: 'Koordinater', description: 'Finn riktig projeksjon for kart og oppmåling.' },
  { name: 'Sjøkart', description: 'Bruk kart og data for trygg ferdsel på sjøen.' },
  { name: 'Havbunn', description: 'Utforsk kunnskap og data om havbunnen langs kysten.' },
];

const narrowCardTitles = ['Sjø', 'Land'] as const;

const gridOutlineStyle = {
  outline: '1px dashed var(--ds-color-neutral-border-default)',
} satisfies CSSProperties;

const fullWidthGridItemStyle = {
  gridColumn: '1 / -1',
} satisfies CSSProperties;

const gridTagStyle = {
  ...fullWidthGridItemStyle,
  maxWidth: '100%',
  whiteSpace: 'normal',
  wordBreak: 'normal',
} satisfies CSSProperties;

export const Preview: Story = {
  args: {
    alignContent: 'start',
  },
  render: (args) => (
    <Grid
      {...args}
      data-color="neutral"
      style={{
        minHeight: '28rem',
        outline: '1px dashed var(--ds-color-neutral-border-default)',
      }}
    >
      {services.slice(0, 3).map((service) => (
        <Card key={service.name}>
          <Heading data-size="xs">{service.name}</Heading>
          <Paragraph>{service.description}</Paragraph>
        </Card>
      ))}
    </Grid>
  ),
};

export const ItemMinWidth: Story = {
  render: (_args) => (
    <Grid itemMinWidth={250} data-color="neutral">
      <Card>
        <Heading level={3} data-size="xs">
          Eiendom
        </Heading>
        <Paragraph>Se hvem som eier en eiendom.</Paragraph>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Adresse
        </Heading>
        <Paragraph>Søk opp en adresse i Norge.</Paragraph>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Kart
        </Heading>
        <Paragraph>Finn kart over hele landet.</Paragraph>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Høydedata
        </Heading>
        <Paragraph>Last ned terrengmodeller.</Paragraph>
      </Card>
    </Grid>
  ),
};

export const ColumnSpans: Story = {
  render: (_args) => (
    <Grid
      data-color="neutral"
      style={{
        ...gridOutlineStyle,
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      }}
    >
      <Card data-color="accent" style={{ gridColumn: '1 / -1' }}>
        <Paragraph>gridColumn: '1 / -1'</Paragraph>
      </Card>
      <Card data-color="accent" style={{ gridColumn: '1 / span 2' }}>
        <Paragraph>gridColumn: '1 / span 2'</Paragraph>
      </Card>
      <Card>
        <Paragraph>Eiendom</Paragraph>
      </Card>
      <Card>
        <Paragraph>Adresse</Paragraph>
      </Card>
      <Card data-color="accent" style={{ gridRow: '3 / span 2' }}>
        <Paragraph>gridRow: '3 / span 2'</Paragraph>
      </Card>
      <Card data-color="accent" style={{ gridColumn: '2 / 5' }}>
        <Paragraph>gridColumn: '2 / 5'</Paragraph>
      </Card>
      <Card>
        <Paragraph>Stedsnavn</Paragraph>
      </Card>
      <Card>
        <Paragraph>Terreng</Paragraph>
      </Card>
      <Card>
        <Paragraph>Sjøkart</Paragraph>
      </Card>
    </Grid>
  ),
};

const justifyExamples = ['start', 'center', 'end'] as const;

const placeNames = ['Eksempelby', 'Testvik', 'Prøvedal'] as const;

export const Justify: Story = {
  render: (_args) => (
    <Grid alignItems="center" style={{ gridTemplateColumns: 'max-content minmax(0, 1fr)' }}>
      {justifyExamples.map((justify) => (
        <Fragment key={justify}>
          <code>justify=&quot;{justify}&quot;</code>
          <Grid
            itemMinWidth={150}
            justify={justify}
            style={{ outline: '1px dashed var(--ds-color-neutral-border-default)' }}
          >
            {placeNames.map((placeName) => (
              <Card key={placeName} data-color="accent">
                <Paragraph>{placeName}</Paragraph>
              </Card>
            ))}
          </Grid>
        </Fragment>
      ))}
    </Grid>
  ),
};

export const MaxWidth: Story = {
  parameters: { layout: 'fullscreen' },
  render: (_args) => (
    <Grid asChild maxWidth="30ch" style={{ paddingBlock: 'var(--ds-size-6)' }}>
      <form>
        <Textfield label="Fornavn" maxLength={50} />
        <Textfield label="Etternavn" maxLength={50} />
        <Textfield label="E-post" type="email" maxLength={64} />
        <Fieldset>
          <Fieldset.Legend>Dato</Fieldset.Legend>
          <Flex>
            <Textfield
              label="Dag"
              style={{ maxWidth: '3em' }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={2}
            />
            <Textfield
              label="Måned"
              style={{ maxWidth: '3em' }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={2}
            />
            <Textfield
              label="År"
              style={{ maxWidth: '6em' }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
            />
          </Flex>
        </Fieldset>
      </form>
    </Grid>
  ),
};

export const ComplexGridLayout: Story = {
  args: {
    alignContent: 'start',
  },
  render: (args) => (
    <Grid
      {...args}
      data-color="neutral"
      style={{
        minHeight: '16rem',
        ...gridOutlineStyle,
      }}
    >
      <Grid
        style={{
          ...gridOutlineStyle,
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <Tag style={gridTagStyle}>
          item
          <wbr />
          Min
          <wbr />
          Width: ikke satt
        </Tag>
        {services.slice(0, 2).map((service) => (
          <Card key={service.name} data-color="accent">
            <Heading data-size="xs">{service.name}</Heading>
            <Paragraph>{service.description}</Paragraph>
          </Card>
        ))}
      </Grid>
      <Grid style={{ ...gridOutlineStyle, gridTemplateColumns: '2fr 3fr' }}>
        <section style={fullWidthGridItemStyle}>
          <Heading level={3} data-size="xs">
            Tilpasset kolonnebredde
          </Heading>
          <Paragraph data-size="sm">
            Bruker <code>{`style={{ gridTemplateColumns: '2fr 3fr' }}`}</code> for å gi den høyre
            kolonnen mer plass enn den venstre.
          </Paragraph>
        </section>
        <Grid alignContent="start" style={gridOutlineStyle}>
          <Grid itemMinWidth={150} style={gridOutlineStyle}>
            <Tag style={gridTagStyle}>
              item
              <wbr />
              Min
              <wbr />
              Width: 150
            </Tag>
            {narrowCardTitles.map((title) => (
              <Card key={title} data-color="accent">
                <Heading data-size="xs">{title}</Heading>
              </Card>
            ))}
          </Grid>
        </Grid>
        <Grid itemMinWidth={250} gap={4} style={gridOutlineStyle}>
          <Tag style={gridTagStyle}>
            item
            <wbr />
            Min
            <wbr />
            Width: 250
          </Tag>
          {services.slice(4).map((service) => (
            <Card key={service.name} data-color="accent" style={fullWidthGridItemStyle}>
              <Heading data-size="xs">{service.name}</Heading>
              <Paragraph>{service.description}</Paragraph>
            </Card>
          ))}
          <Grid itemMinWidth={200} style={{ ...gridOutlineStyle, gridColumn: '1 / -1' }}>
            <Tag style={gridTagStyle}>
              item
              <wbr />
              Min
              <wbr />
              Width: 200
            </Tag>
            {services.map((service) => (
              <Card key={service.name} data-color="accent">
                <Heading data-size="xs">{service.name}</Heading>
              </Card>
            ))}
          </Grid>
          {services.slice(3, 4).map((service) => (
            <Card key={service.name} data-color="accent" style={fullWidthGridItemStyle}>
              <Heading data-size="xs">{service.name}</Heading>
              <Paragraph>{service.description}</Paragraph>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ),
};

const properties = [
  { id: '0000-1-1', address: 'Eksempelgata 1, Eksempelby', tags: ['Bolig'] },
  { id: '0000-2-2', address: 'Testvegen 2, Testvik', tags: ['Næring'] },
  { id: '0000-3-3', address: 'Prøvealléen 3, Prøvedal', tags: ['Bolig'] },
  { id: '0000-4-4', address: 'Demovegen 4, Demostad', tags: ['Fritid'] },
];

export const ComplexPage: Story = {
  parameters: { layout: 'fullscreen' },
  render: (_args) => (
    <Grid
      maxWidth="var(--kvds-frame-content-max-width)"
      gap={10}
      style={{ paddingBlock: 'var(--ds-size-8)' }}
    >
      <Flex justify="space-between" alignItems="center">
        <Heading level={1} data-size="lg">
          Mine eiendommer
        </Heading>
        <Flex gap={4}>
          <Button>Legg til eiendom</Button>
          <Button variant="secondary">Last ned oversikt</Button>
        </Flex>
      </Flex>

      <Flex itemMinWidth={300} gap={8} alignItems="start">
        <Grid itemMinWidth={250} data-color="neutral" rowGap={8} style={{ flexGrow: 3 }}>
          {properties.map((property) => (
            <Card key={property.id}>
              <Flex gap={2}>
                {property.tags.map((tag) => (
                  <Tag key={tag} data-color="accent" variant="outline">
                    {tag}
                  </Tag>
                ))}
              </Flex>
              <Heading data-size="xs">{property.address}</Heading>
              <Paragraph data-size="sm">Matrikkelnummer {property.id}</Paragraph>
            </Card>
          ))}
        </Grid>

        <Card data-color="accent">
          <Heading data-size="xs">Finn en eiendom</Heading>
          <Search>
            <Search.Input aria-label="Søk etter eiendom" />
            <Search.Clear />
            <Search.Button />
          </Search>
        </Card>
      </Flex>
    </Grid>
  ),
};
