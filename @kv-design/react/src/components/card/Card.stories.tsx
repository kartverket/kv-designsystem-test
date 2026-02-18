import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Heading } from '../heading/Heading';
import { Paragraph } from '../paragraph/Paragraph';

const meta = {
  component: Card,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: [],
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: '320px' }}>
      <Heading>Card heading</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed sodales lacus. 
        Nullam varius erat sit amet arcu fringilla eleifend.
      </Paragraph>
      <Paragraph data-size='sm'>Footer</Paragraph>
    </Card>
  ),
};

