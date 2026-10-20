import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Tag } from '../tag/Tag';
import { Textfield } from '../textfield/Textfield';
import { DemoBox, demoContainerStyle } from './docs/DemoBox';

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

export const Preview: Story = {
  args: {
    alignContent: 'start',
  },
  render: (args) => (
    <Flex {...args} style={demoContainerStyle}>
      <DemoBox>Oslo</DemoBox>
      <DemoBox>Bergen</DemoBox>
      <DemoBox isTall>Trondheim</DemoBox>
      <DemoBox>Stavanger</DemoBox>
      <DemoBox>Kristiansand</DemoBox>
      <DemoBox isTall>Tromsø</DemoBox>
      <DemoBox>Drammen</DemoBox>
      <DemoBox>Fredrikstad</DemoBox>
      <DemoBox>Hammerfest</DemoBox>
      <DemoBox isTall>Lillehammer</DemoBox>
      <DemoBox>Bodø</DemoBox>
      <DemoBox>Ålesund</DemoBox>
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
    <Flex gap={2}>
      <Tag data-color="info">Matrikkel</Tag>
      <Tag data-color="info">Grunnbok</Tag>
      <Tag data-color="info">Eiendomsgrenser</Tag>
      <Tag data-color="info">Adresser</Tag>
      <Tag data-color="info">Høydedata</Tag>
      <Tag data-color="info">Sjøkart</Tag>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: (_args) => (
    <Flex justifyItems="space-between" alignItems="center">
      <Heading level={2} data-size="sm">
        Mine eiendommer
      </Heading>
      <Button variant="secondary">Legg til eiendom</Button>
    </Flex>
  ),
};

export const ItemsMinWidth: Story = {
  render: (_args) => (
    <Flex itemsMinWidth={200}>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Kort tekst
        </Heading>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Et kort med litt lengre tekst
        </Heading>
      </Card>
      <Card data-color="neutral">
        <Heading level={3} data-size="xs">
          Mellomlang tekst
        </Heading>
      </Card>
      <Card data-color="neutral">
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
      <Button>Søk</Button>
    </Flex>
  ),
};
