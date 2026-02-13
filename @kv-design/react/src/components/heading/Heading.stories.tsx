import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  component: Heading,
  tags: ['alfa', 'digdir'],
  parameters: {
    layout: 'centered',
    componentOrigin: {
      originator: 'digdir',
    },
  },
  
  argTypes: {
    'data-size': {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
  title: 'Components/Typography/Heading',
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Dette er en overskrift',
  },
};
