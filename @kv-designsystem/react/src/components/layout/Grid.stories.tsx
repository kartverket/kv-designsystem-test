import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Grid } from './Grid';
import { Flex } from './Flex';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Search } from '../search/Search';
import { Tag } from '../tag/Tag';
import { Textfield } from '../textfield/Textfield';

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
          <Heading data-size="xs">
            {service.name}
          </Heading>
          <Paragraph>{service.description}</Paragraph>
        </Card>
      ))}
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
          item<wbr />Min<wbr />Width: ikke satt
        </Tag>
        {services.slice(0, 2).map((service) => (
          <Card key={service.name} data-color="accent">
            <Heading data-size="xs">
              {service.name}
            </Heading>
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
              item<wbr />Min<wbr />Width: 150
            </Tag>
            {narrowCardTitles.map((title) => (
              <Card key={title} data-color="accent">
                <Heading data-size="xs">
                  {title}
                </Heading>
              </Card>
            ))}
          </Grid>
        </Grid>
        <Grid itemMinWidth={250} gap={4} style={gridOutlineStyle}>
          <Tag style={gridTagStyle}>
            item<wbr />Min<wbr />Width: 250
          </Tag>
          {services.slice(4).map((service) => (
            <Card key={service.name} data-color="accent" style={fullWidthGridItemStyle}>
              <Heading data-size="xs">
                {service.name}
              </Heading>
              <Paragraph>{service.description}</Paragraph>
            </Card>
          ))}
          <Grid
            itemMinWidth={200}
            style={{ ...gridOutlineStyle, gridColumn: '1 / -1' }}
          >
            <Tag style={gridTagStyle}>
              item<wbr />Min<wbr />Width: 200
            </Tag>
            {services.map((service) => (
              <Card key={service.name} data-color="accent">
                <Heading data-size="xs">
                  {service.name}
                </Heading>
              </Card>
            ))}
          </Grid>
          {services.slice(3, 4).map((service) => (
            <Card key={service.name} data-color="accent" style={fullWidthGridItemStyle}>
              <Heading data-size="xs">
                {service.name}
              </Heading>
              <Paragraph>{service.description}</Paragraph>
            </Card>
          ))}
        </Grid>
      </Grid>
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
      <Card
        data-color="accent"
        style={{ ...gridOutlineStyle, gridColumn: '1 / -1' }}
      >
        <Paragraph>gridColumn: '1 / -1'</Paragraph>
      </Card>
      <Card
        data-color="accent"
        style={{ ...gridOutlineStyle, gridColumn: '1 / span 2' }}
      >
        <Paragraph>gridColumn: '1 / span 2'</Paragraph>
      </Card>
      <Card style={{ ...gridOutlineStyle, gridColumn: '3 / 4' }}>
        <Paragraph>Eiendom</Paragraph>
      </Card>
      <Card style={{ ...gridOutlineStyle, gridColumn: '4 / 5' }}>
        <Paragraph>Adresse</Paragraph>
      </Card>
      <Card style={{ ...gridOutlineStyle, gridColumn: '1 / 2' }}>
        <Paragraph>Kart</Paragraph>
      </Card>
      <Card
        data-color="accent"
        style={{ ...gridOutlineStyle, gridColumn: '2 / 5' }}
      >
        <Paragraph>gridColumn: '2 / 5'</Paragraph>
      </Card>
      <Card style={gridOutlineStyle}>
        <Paragraph>Høydedata</Paragraph>
      </Card>
      <Card style={gridOutlineStyle}>
        <Paragraph>Stedsnavn</Paragraph>
      </Card>
      <Card style={gridOutlineStyle}>
        <Paragraph>Terreng</Paragraph>
      </Card>
      <Card style={gridOutlineStyle}>
        <Paragraph>Sjøkart</Paragraph>
      </Card>
    </Grid>
  ),
};

const justifyItemsExamples = [
  'start',
  'center',
  'end',
] as const;

const placeNames = ['Oslo', 'Bergen', 'Tromsø'] as const;

export const JustifyItems: Story = {
  render: (_args) => (
    <Grid gap={4}>
      {justifyItemsExamples.map((justifyItems) => (
        <Grid
          key={justifyItems}
          alignItems="center"
          style={{ gridTemplateColumns: 'minmax(10rem, 1fr) minmax(0, 2fr)' }}
        >
          <code>justifyItems=&quot;{justifyItems}&quot;</code>
          <Grid
            itemMinWidth={100}
            justifyItems={justifyItems}
            data-color="neutral"
            style={{ outline: '1px dashed var(--ds-color-neutral-border-default)' }}
          >
            {placeNames.map((placeName) => (
              <Card key={placeName} data-color="accent">
                <Paragraph>{placeName}</Paragraph>
              </Card>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  ),
};

export const MaxWidth: Story = {
  parameters: { layout: 'fullscreen' },
  render: (_args) => (
    <Grid asChild maxWidth="30rem" style={{ paddingBlock: 'var(--ds-size-6)' }}>
      <form>
        <Textfield label="Fornavn" />
        <Textfield label="Etternavn" />
        <Textfield label="E-post" type="email" />
      </form>
    </Grid>
  ),
};

export const Combined: Story = {
  render: (_args) => (
    <Grid gap={6}>
      <Textfield label="Adresse" />
      <Flex itemMinWidth={150}>
        <Textfield label="Postnummer" />
        <Textfield label="Poststed" style={{ flexGrow: 3 }} />
      </Flex>
      <Flex>
        <Button>Lagre</Button>
        <Button variant="secondary">Avbryt</Button>
      </Flex>
    </Grid>
  ),
};

const properties = [
  { id: '3301-1-12', address: 'Storgata 12, Drammen', tags: ['Bolig', 'Tinglyst'] },
  { id: '5001-401-7', address: 'Kjøpmannsgata 7, Trondheim', tags: ['Næring'] },
  { id: '1103-25-3', address: 'Breigata 3, Stavanger', tags: ['Bolig', 'Under behandling'] },
  { id: '5501-118-40', address: 'Strandvegen 40, Tromsø', tags: ['Fritid'] },
];

export const ComplexPage: Story = {
  parameters: { layout: 'fullscreen' },
  render: (_args) => (
    <Grid
      maxWidth="var(--kvds-frame-content-max-width)"
      gap={10}
      style={{ paddingBlock: 'var(--ds-size-8)' }}
    >
      <Flex justifyItems="space-between" alignItems="center">
        <Heading level={1} data-size="lg">
          Mine eiendommer
        </Heading>
        <Flex gap={2}>
          <Button>Legg til eiendom</Button>
          <Button variant="secondary">Last ned oversikt</Button>
        </Flex>
      </Flex>

      <Flex itemMinWidth={300} gap={8} alignItems="start">
        <Grid itemMinWidth={250} data-color="neutral" style={{ flexGrow: 3 }}>
          {properties.map((property) => (
            <Card key={property.id}>
              <Heading data-size="xs">
                {property.address}
              </Heading>
              <Paragraph data-size="sm">Matrikkelnummer {property.id}</Paragraph>
              <Flex gap={2} data-color="info">
                {property.tags.map((tag) => (
                  <Tag key={tag}>
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Card>
          ))}
        </Grid>

        <Card data-color="accent">
          <Heading data-size="xs">
            Finn en eiendom
          </Heading>
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
