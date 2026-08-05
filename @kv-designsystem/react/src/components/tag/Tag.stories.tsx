import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, type TagProps } from './Tag';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { RobotIcon } from '@navikt/aksel-icons';
import { Card } from '../card/Card';

const meta = {
  component: Tag,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Tag',
  }
};

export const Icons: Story = {
  render: (_args) => (
    <Tag
      data-color='neutral'
      data-size='md'
      style={{
        paddingInlineStart: 'var(--ds-size-1)',
      }}
    >
      <RobotIcon aria-hidden style={{ marginInlineEnd: 'var(--ds-size-1)' }} />
      Teksten er KI-generert
    </Tag>
  )
};

const colorVariants = [
  'neutral',
  'accent',
  'support-1',
  'support-2',
  'success',
  'warning',
  'danger',
  'info'
];

export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, max-content)',
        gap: 'var(--ds-size-2)',
      }}
    >
      {colorVariants.map((color) => (
        <Tag key={color} data-color={color as TagProps['data-color']} {...args}>{color}</Tag>
      ))}
    </ div>
  )
};

export const WithOutline: Story = {
  args: {
    variant: 'outline',
  },
  render: Variants.render,
};

const propertyImage =
  'https://eiendomsregisteret.kartverket.no/egenregistrering.jpeg';

export const InCard: Story = {
  render: (_args) => (
    <Card style={{ width: '320px' }}>
      <Card.Block>
        <img src={propertyImage} alt='Et hus ved en fjord' />
      </Card.Block>
      <Card.Block>
        <Tag data-color='accent' data-size='sm'>Nyhet</Tag>
        <Heading>
          <a href='#'>Egenregistrering</a>
        </Heading>
        <Paragraph>
          Nå kan du som eier eller fester registrere opplysninger om din bolig eller fritidsbolig.
        </Paragraph>
      </Card.Block>
    </Card>
  )
};
