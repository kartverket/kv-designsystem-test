import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Table',
  },
};
