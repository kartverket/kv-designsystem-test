import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textfield } from './Textfield';
import { Tag } from '../tag/Tag';

const meta = {
  args: {
    label: '',
  },
  component: Textfield,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Label',
  }
};

export const Multiline: Story = {
  args: {
    label: 'Beskrivelse',
    multiline: true,
    rows: 4,
  }
};

export const Affix: Story = {
  args: {
    label: 'Hvor mange kroner koster det per måned?',
    prefix: 'NOK',
    suffix: 'pr. mnd'
  }
};

export const Counter: Story = {
  args: {
    label: 'Hvor mange kroner koster det per måned?',
    counter: 10
  }
};

export const Required: Story = {
  render: (_args) => (
    <Textfield
      label={[
        'Hvor bor du?',
        <Tag
          data-color='warning'
          style={{ marginInlineStart: 'var(--ds-size-2)' }}
        >
          Må fylles ut
        </Tag>
      ]}
      required
    />
  ),
};

