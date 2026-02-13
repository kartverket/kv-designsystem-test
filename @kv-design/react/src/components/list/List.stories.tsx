import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';

const meta = {
  component: List.Item,
} satisfies Meta<typeof List.Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'List',
  },
};
