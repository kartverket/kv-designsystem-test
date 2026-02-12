import type { Meta, StoryObj } from '@storybook/react-vite';
import { Details } from './Details';

const meta = {
  component: Details,
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Details',
  },
};
