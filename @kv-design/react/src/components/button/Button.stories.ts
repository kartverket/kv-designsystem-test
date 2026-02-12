import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['alfa', 'digdir'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    icon: false,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    children: 'Button with emojis 😄👍😍💯',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    children: 'Tertiary button',
    variant: 'tertiary',
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    'data-size': 'lg',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    'data-size': 'sm',
  },
};
