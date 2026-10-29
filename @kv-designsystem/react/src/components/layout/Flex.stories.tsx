import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';
import { Grid } from './Grid';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Tag } from '../tag/Tag';
import { Textfield } from '../textfield/Textfield';

const meta = {
  component: Flex,
  title: 'Components/Layout/Flex',
  tags: ['!autodocs'],
  argTypes: {
    // asChild needs exactly one child, so toggling it in the Preview would crash the story
    asChild: { control: false },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const propertyServices = [
  { name: 'Eiendomsgrenser' },
  { name: 'Matrikkelopplysninger' },
  { name: 'Grunnboksutskrift' },
  { name: 'Tinglyst dokument' },
  { name: 'Skjøte' },
  { name: 'Tinglyse rettigheter' },
];

export const Preview: Story = {
  args: {
    alignContent: 'start',
  },
  render: (args) => (
    <Flex
      {...args}
      data-color="neutral"
      style={{
        minHeight: '16rem',
        outline: '1px dashed var(--ds-color-neutral-border-default)',
      }}
    >
      {propertyServices.map((service) => (
        <Card key={service.name}>
          <Paragraph>{service.name}</Paragraph>
        </Card>
      ))}
    </Flex>
  ),
};

export const ButtonsAndTags: Story = {
  render: (_args) => (
    <Grid>
      <Flex>
        <Button>Lagre</Button>
        <Button variant="secondary">Avbryt</Button>
      </Flex>
      <Flex gap={2} data-color="info">
        <Tag>Matrikkel</Tag>
        <Tag>Grunnbok</Tag>
        <Tag>Eiendomsgrenser</Tag>
        <Tag>Adresser</Tag>
        <Tag>Høydedata</Tag>
        <Tag>Sjøkart</Tag>
      </Flex>
    </Grid>
  ),
};

export const SpaceBetween: Story = {
  render: (_args) => (
    <Flex
      justify="space-between"
      alignItems="center"
      style={{
        minHeight: '8rem',
        outline: '1px dashed var(--ds-color-neutral-border-default)',
      }}
    >
      <Heading data-size="sm">Mine eiendommer</Heading>
      <Button variant="secondary">Legg til eiendom</Button>
    </Flex>
  ),
};

export const ItemMinWidth: Story = {
  render: (_args) => (
    <Flex itemMinWidth={200} data-color="neutral">
      <Card>
        <Heading level={3} data-size="xs">
          Kort tekst
        </Heading>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Et kort med litt lengre tekst
        </Heading>
      </Card>
      <Card>
        <Heading level={3} data-size="xs">
          Mellomlang tekst
        </Heading>
      </Card>
      <Card>
        <Paragraph>
          Elementene vokser og fyller raden. Hvis det blir for trangt, brekker de til ny linje.
        </Paragraph>
      </Card>
    </Flex>
  ),
};

export const StyleSingleItem: Story = {
  render: (_args) => (
    <Flex flexWrap="nowrap" alignItems="end">
      <Textfield label="Adresse" style={{ flexGrow: 1 }} />
      <Button>Lagre</Button>
    </Flex>
  ),
};
