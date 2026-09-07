import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  component: Logo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    variant: 'horizontal',
  },
  render: (args) => (
    <Logo {...args} />
  ),
};

export const Variants: Story = {
  render: (_args) => (
    <div>
      <Logo />
      <Logo variant='vertical' size='var(--ds-size-18)' />
    </div>
  )
};

export const Symbol: Story = {
  render: (_args) => (
    <div>
      <Logo variant='symbol' size='var(--ds-size-18)' />
    </div>
  )
};

export const Negative: Story = {
  render: (_args) => (
    <div data-color-scheme='dark'>
      <Logo variant='horizontal' />
      <Logo variant='vertical' size='var(--ds-size-18)' />
    </div>
  )
};
