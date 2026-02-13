import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';

const meta = {
  component: List.Item,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof List.Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'List',
  },
  render: (args) => (
    <List.Unordered>
      <List.Item>Bøyabreen</List.Item>
      <List.Item>Briksdalsbreen</List.Item>
      <List.Item>Nigardsbreen</List.Item>
    </List.Unordered>
  ),
};
