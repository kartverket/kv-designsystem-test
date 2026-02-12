import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from './Search';

const meta = {
  component: Search,
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Search',
  },
};
