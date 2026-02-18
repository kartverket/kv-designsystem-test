import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  component: Chip.Radio,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Chip.Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Chip',
  },
};
