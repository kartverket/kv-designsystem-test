import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup } from './ToggleGroup';

const meta = {
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'ToggleGroup',
  },
};
