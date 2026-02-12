import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';

const meta = {
  component: Fieldset,
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Fieldset',
  },
};
