import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup } from './ToggleGroup';

const meta = {
  component: ToggleGroup,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'ToggleGroup',
  },
  render: (args) => (
    <ToggleGroup defaultValue='innboks'>
      <ToggleGroup.Item value='innboks'>Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value='utkast'>Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value='arkiv'>Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value='sendt'>Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
};
