import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  component: Label,
  parameters: {layout: 'centered'},
  title: 'Components/Typography/Label',
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Fødselsnummer (11 sifre)',
  },
};
