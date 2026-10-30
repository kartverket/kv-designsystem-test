import { Buildings2Icon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Alert } from '../alert/Alert';
import { Card } from '../card/Card';
import { Divider } from '../divider/Divider';
import { Tag } from '../tag/Tag';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { DescriptionList } from './';
import { subcomponents } from './docs/subcomponents';

const meta = {
  component: DescriptionList,
  subcomponents,
  title: 'Components/DescriptionList',
  parameters: { layout: 'padded' },
  argTypes: {
    rowGap: {
      table: { defaultValue: { summary: '3' } },
    },
    columnGap: {
      table: { defaultValue: { summary: '5' } },
    },
    termMinWidth: {
      table: { defaultValue: { summary: '11rem' } },
    },
    descriptionMinWidth: {
      table: { defaultValue: { summary: '11rem' } },
    },
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleTagsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ds-size-2)',
  marginBottom: 'var(--ds-size-4)',
};

export const Preview: Story = {
  args: {
    listOrientation: 'vertical',
    pairOrientation: 'horizontal',
  },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item>
        <DescriptionList.Term>Adresse</DescriptionList.Term>
        <DescriptionList.Description>Kartverksveien 21, 3507 Hønefoss</DescriptionList.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
        <DescriptionList.Description>38</DescriptionList.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Bruksnummer</DescriptionList.Term>
        <DescriptionList.Description>12</DescriptionList.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Kommunenummer</DescriptionList.Term>
        <DescriptionList.Description>3305</DescriptionList.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Eiendomstype</DescriptionList.Term>
        <DescriptionList.Description>Boligeiendom</DescriptionList.Description>
      </DescriptionList.Item>
    </DescriptionList>
  ),
};

export const Horizontal: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical', itemMinWidth: 250 },
  render: (args) => (
    <div>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="{args.listOrientation ?? 'vertical'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="{args.pairOrientation ?? 'horizontal'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          itemMinWidth={args.itemMinWidth ?? 350}
        </Tag>
      </div>
      <DescriptionList {...args}>
        <DescriptionList.Item>
          <DescriptionList.Term>Adresse</DescriptionList.Term>
          <DescriptionList.Description>
            Kartverksveien 21, 3507 Hønefoss
          </DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
          <DescriptionList.Description>38</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Bruksnummer</DescriptionList.Term>
          <DescriptionList.Description>12</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Kommunenummer</DescriptionList.Term>
          <DescriptionList.Description>3305</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Eiendomstype</DescriptionList.Term>
          <DescriptionList.Description>Boligeiendom</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Fylkesnummer</DescriptionList.Term>
          <DescriptionList.Description>33</DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const VerticalPairs: Story = {
  args: { listOrientation: 'vertical', pairOrientation: 'vertical' },
  render: (args) => (
    <div>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="{args.listOrientation ?? 'vertical'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="{args.pairOrientation ?? 'horizontal'}"
        </Tag>
      </div>
      <DescriptionList {...args}>
        <DescriptionList.Item>
          <DescriptionList.Term>Adresse</DescriptionList.Term>
          <DescriptionList.Description>
            Kartverksveien 21, 3507 Hønefoss
          </DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
          <DescriptionList.Description>38</DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const HorizontalPairs: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'horizontal' },
  render: (args) => (
    <div>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="{args.listOrientation ?? 'vertical'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="{args.pairOrientation ?? 'horizontal'}"
        </Tag>
      </div>
      <DescriptionList {...args}>
        <DescriptionList.Item>
          <DescriptionList.Term>Adresse</DescriptionList.Term>
          <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
          <DescriptionList.Description>38</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Bruksnummer</DescriptionList.Term>
          <DescriptionList.Description>12</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Kommunenummer</DescriptionList.Term>
          <DescriptionList.Description>3305</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Eiendomstype</DescriptionList.Term>
          <DescriptionList.Description>Boligeiendom</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Fylkesnummer</DescriptionList.Term>
          <DescriptionList.Description>33</DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const NarrowHorizontal: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'horizontal' },
  render: (args) => (
    <div style={{ width: 'min(100%, 20rem)' }}>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="{args.listOrientation ?? 'vertical'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="{args.pairOrientation ?? 'horizontal'}"
        </Tag>
      </div>
      <DescriptionList {...args}>
        <DescriptionList.Item>
          <DescriptionList.Term>Adresse</DescriptionList.Term>
          <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
          <DescriptionList.Description>38</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>
            <Buildings2Icon role="img" aria-label="Eiendom" />
          </DescriptionList.Term>
          <DescriptionList.Description>Kartverksveien 22</DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const CustomWrapPoints: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ width: 'min(100%, 55rem)' }}>
        <div style={exampleTagsStyle}>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            listOrientation="{args.listOrientation ?? 'horizontal'}"
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            pairForceVerticalBelow={args.pairForceVerticalBelow ?? 500}
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            listForceVerticalBelow={args.listForceVerticalBelow ?? 400}
          </Tag>
        </div>
        <DescriptionList
          {...args}
          listOrientation={args.listOrientation ?? 'horizontal'}
          pairForceVerticalBelow={args.pairForceVerticalBelow ?? 500}
        >
          <DescriptionList.Item>
            <DescriptionList.Term>Adresse</DescriptionList.Term>
            <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
            <DescriptionList.Description>38</DescriptionList.Description>
          </DescriptionList.Item>
        </DescriptionList>
      </div>
      <Divider />
      <div style={{ width: 'min(100%, 55rem)' }}>
        <div style={exampleTagsStyle}>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            listOrientation="{args.listOrientation ?? 'horizontal'}"
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            listForceVerticalBelow={args.listForceVerticalBelow ?? 500}
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            pairForceVerticalBelow={args.pairForceVerticalBelow ?? 300}
          </Tag>
        </div>
        <DescriptionList
          {...args}
          listOrientation={args.listOrientation ?? 'horizontal'}
          listForceVerticalBelow={args.listForceVerticalBelow ?? 500}
        >
          <DescriptionList.Item>
            <DescriptionList.Term>Adresse</DescriptionList.Term>
            <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
            <DescriptionList.Description>38</DescriptionList.Description>
          </DescriptionList.Item>
        </DescriptionList>
      </div>
    </div>
  ),
};

export const PercentageWidth: Story = {
  render: () => (
    <div style={{ width: 'min(100%, 800px)' }}>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          style.width="50%"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="horizontal"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="horizontal"
        </Tag>
      </div>
      <DescriptionList
        listOrientation="horizontal"
        pairOrientation="horizontal"
        style={{ width: '50%' }}
      >
        <DescriptionList.Item>
          <DescriptionList.Term>Adresse</DescriptionList.Term>
          <DescriptionList.Description>
            Kartverksveien 21, 3507 Hønefoss
          </DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
          <DescriptionList.Description>38</DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical' },
  render: (args) => (
    <div>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="{args.listOrientation ?? 'vertical'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="{args.pairOrientation ?? 'horizontal'}"
        </Tag>
      </div>
      <DescriptionList {...args} style={{ maxWidth: '36rem' }}>
        <DescriptionList.Item>
          <DescriptionList.Term>
            <Buildings2Icon role="img" aria-label="Eiendom" />
          </DescriptionList.Term>
          <DescriptionList.Description>
            <Paragraph>
              Kartverksveien 21 har flere registrerte bygninger og tilhører samme eiendom.
            </Paragraph>
          </DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>
            <Buildings2Icon role="img" aria-label="Eiendom" />
          </DescriptionList.Term>
          <DescriptionList.Description>
            <Paragraph>Kartverksveien 22</Paragraph>
          </DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const CircleColors: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
        gap: 'var(--ds-size-6)',
      }}
    >
      {(['neutral', 'accent', 'support-1', 'support-2'] as const).map((color) => (
        <div key={color}>
          <div style={exampleTagsStyle}>
            <Tag data-color="neutral" data-size="sm" variant="outline">
              data-color="{color}"
            </Tag>
          </div>
          <DescriptionList data-color={color}>
            <DescriptionList.Item>
              <DescriptionList.Term variant="circle">
                <Buildings2Icon role="img" aria-label="Eiendom" />
              </DescriptionList.Term>
              <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
            </DescriptionList.Item>
          </DescriptionList>
        </div>
      ))}
    </div>
  ),
};

const customCircleSizeStyle: CSSProperties & {
  '--kvdsc-description-list-circle-size': string;
  '--kvdsc-description-list-circle-icon-size': string;
} = {
  maxWidth: '25rem',
  '--kvdsc-description-list-circle-size': 'var(--ds-size-12)',
  '--kvdsc-description-list-circle-icon-size': 'var(--ds-size-8)',
};

export const CustomCircleSizes: Story = {
  render: () => (
    <DescriptionList style={customCircleSizeStyle}>
      <DescriptionList.Item>
        <DescriptionList.Term variant="circle">
          <Buildings2Icon role="img" aria-label="Eiendom" />
        </DescriptionList.Term>
        <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term variant="circle">
          <Buildings2Icon role="img" aria-label="Eiendom" />
        </DescriptionList.Term>
        <DescriptionList.Description>
          <Paragraph data-size="sm">
            Kartverksveien 22 har flere registrerte bygninger og tilhører samme eiendom.
          </Paragraph>
        </DescriptionList.Description>
      </DescriptionList.Item>
    </DescriptionList>
  ),
};

export const CustomGaps: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div>
        <div style={exampleTagsStyle}>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            gap=6
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            rowGap=8
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            pairGap=4
          </Tag>
        </div>
        <DescriptionList gap={6} rowGap={8} pairGap={4}>
          <DescriptionList.Item>
            <DescriptionList.Term>Adresse</DescriptionList.Term>
            <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
            <DescriptionList.Description>38</DescriptionList.Description>
          </DescriptionList.Item>
        </DescriptionList>
      </div>
      <div>
        <div style={exampleTagsStyle}>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            listOrientation="horizontal"
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            gap=6
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            columnGap=8
          </Tag>
          <Tag data-color="neutral" data-size="sm" variant="outline">
            pairGap=4
          </Tag>
        </div>
        <DescriptionList
          listOrientation="horizontal"
          pairOrientation="horizontal"
          gap={6}
          columnGap={8}
          pairGap={4}
        >
          <DescriptionList.Item>
            <DescriptionList.Term>Adresse</DescriptionList.Term>
            <DescriptionList.Description>Kartverksveien 21</DescriptionList.Description>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
            <DescriptionList.Description>38</DescriptionList.Description>
          </DescriptionList.Item>
        </DescriptionList>
      </div>
    </div>
  ),
};

export const CustomPairWidths: Story = {
  args: {
    listOrientation: 'horizontal',
    pairOrientation: 'horizontal',
    pairGap: 14,
    termMinWidth: '10rem',
    descriptionMinWidth: '12rem',
  },
  render: (args) => (
    <div style={{ width: 'min(100%, 50rem)' }}>
      <div style={exampleTagsStyle}>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          listOrientation="{args.listOrientation ?? 'vertical'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairOrientation="{args.pairOrientation ?? 'horizontal'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          termMinWidth="{args.termMinWidth ?? '11rem'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          descriptionMinWidth="{args.descriptionMinWidth ?? '11rem'}"
        </Tag>
        <Tag data-color="neutral" data-size="sm" variant="outline">
          pairGap={args.pairGap ?? 2}
        </Tag>
      </div>
      <DescriptionList {...args}>
        <DescriptionList.Item>
          <DescriptionList.Term>Adresse</DescriptionList.Term>
          <DescriptionList.Description>
            Kartverksveien 21, 3507 Hønefoss
          </DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
          <DescriptionList.Description>38</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Bruksnummer</DescriptionList.Term>
          <DescriptionList.Description>12</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Kommunenummer</DescriptionList.Term>
          <DescriptionList.Description>3305</DescriptionList.Description>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Eiendomstype</DescriptionList.Term>
          <DescriptionList.Description>Boligeiendom</DescriptionList.Description>
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
};

export const InContainers: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--ds-size-6)' }}>
      <Card style={{ width: 'min(100%, 50rem)' }}>
        <Heading level={2} data-size="xs">
          Eiendomsopplysninger
        </Heading>
        <DescriptionList>
          <DescriptionList.Item>
            <DescriptionList.Term>Adresse</DescriptionList.Term>
            <DescriptionList.Description>
              Kartverksveien 21, 3507 Hønefoss
            </DescriptionList.Description>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
            <DescriptionList.Description>38</DescriptionList.Description>
          </DescriptionList.Item>
        </DescriptionList>
      </Card>
      <Alert data-color="info" style={{ width: 'min(100%, 50rem)' }}>
        <Heading level={2} data-size="xs">
          Eiendommen er funnet
        </Heading>
        <DescriptionList listOrientation="horizontal" pairOrientation="vertical">
          <DescriptionList.Item>
            <DescriptionList.Term>Adresse</DescriptionList.Term>
            <DescriptionList.Description>
              Kartverksveien 21, 3507 Hønefoss
            </DescriptionList.Description>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Gårdsnummer</DescriptionList.Term>
            <DescriptionList.Description>38</DescriptionList.Description>
          </DescriptionList.Item>
        </DescriptionList>
      </Alert>
    </div>
  ),
};
