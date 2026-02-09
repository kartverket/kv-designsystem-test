import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    dataColor: { control: 'select', options: ['ui-1', 'ui-2', 'ui-3', 'ui-4', 'ui-5', 'ui-6', 'ui-7', 'ui-8', 'ui-9'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: 'Button with emojis 😄👍😍💯',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    label: 'Tertiary button',
    variant: 'tertiary',
  },
};


export const Large: Story = {
  args: {
    dataSize: 'lg',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    dataSize: 'sm',
    label: 'Button',
  },
};
