import { Buildings2Icon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../card/Card';
import { Divider } from '../divider/Divider';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { DescriptionList } from './DescriptionList';

const meta = {
  component: DescriptionList,
  title: 'Components/DescriptionList',
  parameters: { layout: 'padded' },
  argTypes: {
    rowGap: {
      table: { defaultValue: { summary: '3' } },
    },
    columnGap: {
      table: { defaultValue: { summary: '5' } },
    },
    'data-size': {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    'data-color': {
      options: [
        'neutral',
        'accent',
        'support-1',
        'support-2',
        'success',
        'warning',
        'danger',
        'info',
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    listOrientation: 'vertical',
    pairOrientation: 'horizontal',
  },
  render: (args) => (
    // TODO: Sørg for at flex ikke wrapper når det er plass til alt på samme linje
    <div style={{}}>
      <DescriptionList {...args}>
        <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
        <DescriptionList.Item term="Kommunenummer">3305</DescriptionList.Item>
        <DescriptionList.Item term="Eiendomstype">Boligeiendom</DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <DescriptionList listOrientation="vertical" pairOrientation="horizontal">
      <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
      <DescriptionList.Item term="Kommunenummer">3305</DescriptionList.Item>
      <DescriptionList.Item term="Eiendomstype">Boligeiendom</DescriptionList.Item>
    </DescriptionList>
  ),
};

export const WithinCard: Story = {
  render: () => (
    <Card data-color="support-2" style={{ maxWidth: '36rem' }}>
      <DescriptionList data-color="accent">
        <DescriptionList.Item term="Adresse">
          <Paragraph data-size="sm">Kartverksveien 21, 3507 Hønefoss</Paragraph>
        </DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      </DescriptionList>
    </Card>
  ),
};

export const Horizontal: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
      <DescriptionList.Item term="Kommunenummer">3305</DescriptionList.Item>
      <DescriptionList.Item term="Eiendomstype">Boligeiendom</DescriptionList.Item>
      <DescriptionList.Item term="Fylkesnummer">33</DescriptionList.Item>
    </DescriptionList>
  ),
};

export const VerticalPairs: Story = {
  args: { listOrientation: 'vertical', pairOrientation: 'vertical' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
    </DescriptionList>
  ),
};

export const HorizontalPairs: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'horizontal' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
      <DescriptionList.Item term="Kommunenummer">3305</DescriptionList.Item>
      <DescriptionList.Item term="Eiendomstype">Boligeiendom</DescriptionList.Item>
      <DescriptionList.Item term="Fylkesnummer">33</DescriptionList.Item>
    </DescriptionList>
  ),
};

export const NarrowHorizontal: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'horizontal' },
  render: (args) => (
    <div style={{ width: 'min(100%, 20rem)' }}>
      <DescriptionList {...args}>
        <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        <DescriptionList.Item term={<Buildings2Icon role="img" aria-label="Eiendom" />}>
          Kartverksveien 22
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const CustomWrapPoints: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ width: 'min(100%, 250px)' }}>
        <DescriptionList listOrientation="horizontal" listForceVerticalBelow={200} {...args}>
          <DescriptionList.Item term="Adresse">
            Kartverksveien 21, 3507 Hønefoss. Opplysninger om eiendommen kan være omfattende.
          </DescriptionList.Item>
          <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        </DescriptionList>
      </div>
      <Divider />
      <div style={{ width: 'min(100%, 450px)' }}>
        <DescriptionList listOrientation="horizontal" pairForceVerticalBelow={500} {...args}>
          <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
          <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        </DescriptionList>
      </div>
      <Divider />
      <div style={{ width: 'min(100%, 450px)' }}>
        <DescriptionList listOrientation="horizontal" listForceVerticalBelow={500} {...args}>
          <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
          <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        </DescriptionList>
      </div>
    </div>
  ),
};

export const PercentageWidth: Story = {
  render: () => (
    <div style={{ width: 'min(100%, 800px)' }}>
      <DescriptionList
        listOrientation="horizontal"
        pairOrientation="horizontal"
        style={{ width: '50%' }}
      >
        <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical', 'data-color': 'accent' },
  render: (args) => (
    <DescriptionList {...args} style={{ maxWidth: '36rem' }}>
      <DescriptionList.Item term={<Buildings2Icon role="img" aria-label="Eiendom" />}>
        <Paragraph>
          Kartverksveien 21 har flere registrerte bygninger og tilhører samme eiendom.
        </Paragraph>
      </DescriptionList.Item>
      <DescriptionList.Item term={<Buildings2Icon role="img" aria-label="Eiendom" />}>
        <Paragraph>Kartverksveien 22</Paragraph>
      </DescriptionList.Item>
    </DescriptionList>
  ),
};

export const WithCircle: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical', 'data-color': 'accent' },
  render: (args) => (
    <DescriptionList {...args} style={{ maxWidth: '36rem' }}>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        <Paragraph data-size="sm">Kartverksveien 21</Paragraph>
      </DescriptionList.Item>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        <Paragraph data-size="sm">
          Kartverksveien 22 har flere registrerte bygninger og tilhører samme eiendom.
        </Paragraph>
      </DescriptionList.Item>
    </DescriptionList>
  ),
};

export const CircleWithVerticalList: Story = {
  render: () => (
    <DescriptionList style={{ maxWidth: '25rem' }}>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        Kartverksveien 21
      </DescriptionList.Item>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        <Paragraph data-size="sm">
          Kartverksveien 22 har flere registrerte bygninger og tilhører samme eiendom.
        </Paragraph>
      </DescriptionList.Item>
    </DescriptionList>
  ),
};

export const CustomGaps: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <DescriptionList gap={6} rowGap={8} pairGap={2}>
        <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      </DescriptionList>
      <DescriptionList
        listOrientation="horizontal"
        pairOrientation="horizontal"
        gap={6}
        columnGap={8}
        pairGap={2}
      >
        <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};
