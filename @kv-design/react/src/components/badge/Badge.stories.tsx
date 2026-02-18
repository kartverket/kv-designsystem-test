import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    count: 15,
    maxCount: 9,  
  },
};
