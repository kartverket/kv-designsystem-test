import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorSummary } from './ErrorSummary';

const meta = {
  component: ErrorSummary,
} satisfies Meta<typeof ErrorSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'ErrorSummary',
  },
};
