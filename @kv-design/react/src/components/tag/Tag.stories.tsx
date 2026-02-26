import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import { Heading } from '../typography/heading/Heading';
import { Avatar } from '../avatar/Avatar';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Divider } from '../divider/Divider';

const meta = {
  component: Tag,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Tag',
  },
};

const propertyImage =
  'https://eiendomsregisteret.kartverket.no/egenregistrering.jpeg';

export const Article: Story = {
  render: () => (
    <div>
      <img
        src={propertyImage}
        alt="Et hus ved en fjord"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: 10,
        }}
      />
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: 'var(--ds-size-4)',
          marginBottom: 'var(--ds-size-3)',
        }}
      >
        <Heading>Egenregistrering</Heading>
        <Tag data-color="accent" data-size="sm">Nyhet</Tag>
      </div>
      <Paragraph>
        Nå kan du som eier eller fester registrere opplysninger om din bolig eller fritidsbolig.
      </Paragraph>
    </div>
  ),
};
