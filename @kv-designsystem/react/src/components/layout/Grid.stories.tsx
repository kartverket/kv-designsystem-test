import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Flex } from './Flex';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { Paragraph } from '../typography/paragraph/Paragraph';

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
    gap: 4,
  },
  render: (args) => (
    <Grid {...args}>
      <Heading level={2} data-size='md'>
        Tinglysing av eiendom
      </Heading>
      <Paragraph>
        Når du tinglyser en eiendom, blir rettighetene dine registrert i grunnboken.
      </Paragraph>
      <Paragraph>
        Opplysningene blir offentlige og kan brukes av både myndigheter og private aktører.
      </Paragraph>
    </Grid>
  ),
};

export const ItemsMinWidth: Story = {
  render: (_args) => (
    <Grid itemsMinWidth={250}>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Eiendom</Heading>
        <Paragraph>Se hvem som eier en eiendom.</Paragraph>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Adresse</Heading>
        <Paragraph>Søk opp en adresse i Norge.</Paragraph>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Kart</Heading>
        <Paragraph>Finn kart over hele landet.</Paragraph>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Høydedata</Heading>
        <Paragraph>Last ned terrengmodeller.</Paragraph>
      </Card>
    </Grid>
  ),
};

export const SpanAllColumns: Story = {
  render: (_args) => (
    <Grid itemsMinWidth={250}>
      <Card data-color='accent' style={{ gridColumn: '1 / -1' }}>
        <Heading level={3} data-size='xs'>Kartverket</Heading>
        <Paragraph>Dette kortet går over alle kolonnene.</Paragraph>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Eiendom</Heading>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Adresse</Heading>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Kart</Heading>
      </Card>
      <Card data-color='neutral'>
        <Heading level={3} data-size='xs'>Høydedata</Heading>
      </Card>
    </Grid>
  ),
};

export const JustifyStart: Story = {
  render: (_args) => (
    <Grid justifyItems='start'>
      <Paragraph>Med justifyItems=&apos;start&apos; tar elementene bare den bredden de trenger.</Paragraph>
      <Button>Send inn</Button>
    </Grid>
  ),
};

export const MaxWidth: Story = {
  parameters: { layout: 'fullscreen' },
  render: (_args) => (
    <Grid maxWidth='40rem' style={{ paddingBlock: 'var(--ds-size-6)' }}>
      <Heading level={2} data-size='md'>
        Smalt innhold på siden
      </Heading>
      <Paragraph>
        Innholdet er aldri bredere enn 40rem og blir sentrert på siden. På små skjermer får det
        samme luft på sidene som Header og Footer.
      </Paragraph>
    </Grid>
  ),
};

export const AsChild: Story = {
  render: (_args) => (
    <Grid asChild gap={2}>
      <ul role='list'>
        <li>
          <Link href='#'>Slik følger du saken din i grunnboken</Link>
        </li>
        <li>
          <Link href='#'>Slik retter du feil i et tinglyst dokument</Link>
        </li>
        <li>
          <Link href='#'>Veiledning for eiendomsmeglere</Link>
        </li>
      </ul>
    </Grid>
  ),
};

export const Combined: Story = {
  render: (_args) => (
    <Grid gap={6}>
      <Grid gap={2}>
        <Heading level={2} data-size='md'>
          Endre adresse
        </Heading>
        <Paragraph>
          Grid stabler innholdet på siden. Flex legger knappene ved siden av hverandre.
        </Paragraph>
      </Grid>
      <Flex>
        <Button>Lagre</Button>
        <Button variant='secondary'>Avbryt</Button>
      </Flex>
    </Grid>
  ),
};
