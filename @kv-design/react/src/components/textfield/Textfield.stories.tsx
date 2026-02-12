import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textfield } from './Textfield';

const meta = {
  component: Textfield,
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Textfield',
  },
};
