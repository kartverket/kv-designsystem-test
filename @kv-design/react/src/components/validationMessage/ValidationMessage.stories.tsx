import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationMessage } from './ValidationMessage';

const meta = {
  component: ValidationMessage,
  parameters: {layout: 'centered'},
  title: 'Components/Typography/ValidationMessage',
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'ValidationMessage',
  },
};
