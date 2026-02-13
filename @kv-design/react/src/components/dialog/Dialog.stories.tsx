import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Dialog',
  },
};
