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
};
