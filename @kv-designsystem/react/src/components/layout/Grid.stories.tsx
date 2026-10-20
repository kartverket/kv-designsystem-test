import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Flex } from './Flex';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Tag } from '../tag/Tag';
import { Textfield } from '../textfield/Textfield';
import { DemoBox, demoContainerStyle } from './docs/DemoBox';

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

export const Preview: Story = {
  args: {
    itemsMinWidth: 150,
    alignContent: 'start',
  },
  render: (args) => (
    <Grid {...args} style={demoContainerStyle}>
      <DemoBox>Oslo</DemoBox>
      <DemoBox>Bergen</DemoBox>
      <DemoBox isTall>Trondheim</DemoBox>
      <DemoBox>Stavanger</DemoBox>
      <DemoBox>Kristiansand</DemoBox>
      <DemoBox isTall>Tromsø</DemoBox>
      <DemoBox>Drammen</DemoBox>
      <DemoBox>Fredrikstad</DemoBox>
    </Grid>
  ),
};

export const ItemsMinWidth: Story = {
  render: (_args) => (
    <Grid itemsMinWidth={250}>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Eiendom
        </Heading>
        <Paragraph>Se hvem som eier en eiendom.</Paragraph>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Adresse
        </Heading>
        <Paragraph>Søk opp en adresse i Norge.</Paragraph>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Kart
        </Heading>
        <Paragraph>Finn kart over hele landet.</Paragraph>
      </Card>
      <Card data-color="neutral">
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
    <Grid itemsMinWidth={250}>
      <Card data-color="accent" style={{ gridColumn: '1 / -1' }}>
        <Heading level={3} data-size="xs">
          Kartverket
        </Heading>
        <Paragraph>Dette kortet går over alle kolonnene.</Paragraph>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Eiendom
        </Heading>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Adresse
        </Heading>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Kart
        </Heading>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Høydedata
        </Heading>
      </Card>
    </Grid>
  ),
};

export const JustifyStart: Story = {
  render: (_args) => (
    <Grid justifyItems="start" style={{ outline: demoContainerStyle.outline }}>
      <DemoBox>Oslo</DemoBox>
      <DemoBox>Kristiansand</DemoBox>
      <DemoBox>Bø</DemoBox>
    </Grid>
  ),
};

export const MaxWidth: Story = {
  parameters: { layout: 'fullscreen' },
  render: (_args) => (
    <Grid maxWidth="30rem" style={{ paddingBlock: 'var(--ds-size-6)' }}>
      <Textfield label="Fornavn" />
      <Textfield label="Etternavn" />
      <Textfield label="E-post" type="email" />
    </Grid>
  ),
};

export const AsChild: Story = {
  render: (_args) => (
    <Grid asChild gap={2}>
      <ul role="list">
        <li>
          <Link href="#">Slik følger du saken din i grunnboken</Link>
        </li>
        <li>
          <Link href="#">Slik retter du feil i et tinglyst dokument</Link>
        </li>
        <li>
          <Link href="#">Veiledning for eiendomsmeglere</Link>
        </li>
      </ul>
    </Grid>
  ),
};

export const Combined: Story = {
  render: (_args) => (
    <Grid gap={6}>
      <Textfield label="Adresse" />
      <Flex itemsMinWidth={150}>
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

      <Flex itemsMinWidth={300} gap={8} alignItems="start">
        <Grid itemsMinWidth={250} style={{ flexGrow: 3 }}>
          {properties.map((property) => (
            <Card key={property.id} data-color="neutral">
              <Heading level={2} data-size="xs">
                {property.address}
              </Heading>
              <Paragraph data-size="sm">Matrikkelnummer {property.id}</Paragraph>
              <Flex gap={2}>
                {property.tags.map((tag) => (
                  <Tag key={tag} data-color="info">
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Card>
          ))}
        </Grid>

        <Card data-color="accent">
          <Heading level={2} data-size="xs">
            Finn en eiendom
          </Heading>
          <Grid asChild justifyItems="start">
            <form onSubmit={(event) => event.preventDefault()}>
              <Textfield label="Adresse" style={{ justifySelf: 'stretch' }} />
              <Textfield label="Kommune" style={{ justifySelf: 'stretch' }} />
              <Button type="submit">Søk</Button>
            </form>
          </Grid>
        </Card>
      </Flex>
    </Grid>
  ),
};
