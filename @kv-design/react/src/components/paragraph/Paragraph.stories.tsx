import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from './Paragraph';

const meta = {
  component: Paragraph,
  title: 'Components/Typography/Paragraph',
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Paragraph',
  },
  render: (args) => (
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed sodales lacus. 
      Nullam varius erat sit amet arcu fringilla eleifend. Aenean dictum libero leo, 
      vitae consequat augue luctus vel.
    </Paragraph>
  ),
};
