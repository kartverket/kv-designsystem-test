import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    'aria-label': 'Henter kaffe',
  },
};
