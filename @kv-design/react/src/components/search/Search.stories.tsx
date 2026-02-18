import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from './Search';

const meta = {
  component: Search,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Search',
  },
  render: (args) => (
    <Search>
      <Search.Input aria-label='Søk' />
      <Search.Clear />
      <Search.Button />
    </Search>
  ),
};
