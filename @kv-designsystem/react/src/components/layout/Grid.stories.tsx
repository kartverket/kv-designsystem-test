import type { Meta, StoryObj } from '@storybook/react-vite';
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
    // asChild needs exactly one child, so toggling it in the Preview would crash the story
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

export const Preview: Story = {
  args: {
    itemMinWidth: 150,
    alignContent: 'start',
  },
  render: (args) => (
    <Grid
      {...args}
      data-color="neutral"
      style={{
        minHeight: '16rem',
        outline: '1px dashed var(--ds-color-neutral-border-default)',
      }}
    >
      {services.map((service) => (
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

export const SpanAllColumns: Story = {
  render: (_args) => (
    <Grid itemMinWidth={250} data-color="neutral">
      <Card data-color="accent" style={{ gridColumn: '1 / -1' }}>
        <Heading level={3} data-size="xs">
          Kartverket
        </Heading>
        <Paragraph>Dette kortet går over alle kolonnene.</Paragraph>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Eiendom
        </Heading>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Adresse
        </Heading>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Kart
        </Heading>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Høydedata
        </Heading>
      </Card>
    </Grid>
  ),
};

export const JustifyStart: Story = {
  render: (_args) => (
    <Grid
      justifyItems="start"
      data-color="neutral"
      style={{ outline: '1px dashed var(--ds-color-neutral-border-default)' }}
    >
      <Card>
        <Heading data-size="xs">
          Oslo
        </Heading>
        <Paragraph>Finn informasjon om eiendommer.</Paragraph>
      </Card>
      <Card>
        <Heading data-size="xs">
          Kristiansand
        </Heading>
        <Paragraph>Se grenser og bygninger.</Paragraph>
      </Card>
      <Card>
        <Heading data-size="xs">
          Bø
        </Heading>
        <Paragraph>Last ned høydedata.</Paragraph>
      </Card>
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
