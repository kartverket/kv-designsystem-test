import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';
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
  { name: 'Eiendomsgrenser', description: 'Se registrerte grenser for en eiendom.' },
  { name: 'Matrikkelopplysninger', description: 'Finn opplysninger som er registrert om eiendommen.' },
  { name: 'Grunnboksutskrift', description: 'Bestill en bekreftet utskrift fra grunnboken.' },
  { name: 'Tinglyst dokument', description: 'Bestill kopi av et dokument som er tinglyst.' },
  { name: 'Skjøte', description: 'Overfør eierskap til fast eiendom.' },
  { name: 'Tinglyse rettigheter', description: 'Registrer en rettighet eller avtale i grunnboken.' },
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
          <Heading data-size="xs">
            {service.name}
          </Heading>
          <Paragraph>{service.description}</Paragraph>
        </Card>
      ))}
    </Flex>
  ),
};

export const Buttons: Story = {
  render: (_args) => (
    <Flex>
      <Button>Lagre</Button>
      <Button variant="secondary">Avbryt</Button>
    </Flex>
  ),
};

export const Tags: Story = {
  render: (_args) => (
    <Flex gap={2} data-color="info">
      <Tag>Matrikkel</Tag>
      <Tag>Grunnbok</Tag>
      <Tag>Eiendomsgrenser</Tag>
      <Tag>Adresser</Tag>
      <Tag>Høydedata</Tag>
      <Tag>Sjøkart</Tag>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: (_args) => (
    <Flex justifyItems="space-between" alignItems="center">
      <Heading data-size="sm">
        Mine eiendommer
      </Heading>
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
          Elementene vokser og fyller raden. Blir det for trangt, brekker de til en ny linje.
        </Paragraph>
      </Card>
    </Flex>
  ),
};

export const StyleSingleItem: Story = {
  render: (_args) => (
    <Flex flexWrap="nowrap" alignItems="end" gap={2}>
      <Textfield label="Adresse" style={{ flexGrow: 1 }} />
      <Button>Lagre</Button>
    </Flex>
  ),
};
