import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  component: Radio,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Radio',
  },
};
