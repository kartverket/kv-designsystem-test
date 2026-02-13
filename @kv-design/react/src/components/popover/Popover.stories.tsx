import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';

const meta = {
  component: Popover,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Popover',
  },
  render: (args) => (
    <Popover.TriggerContext>
      <Popover.Trigger>Åpne popover</Popover.Trigger>
      <Popover placement='top'>
        Popoveret gir en rask beskjed. Her kan du vise brukeren informasjon som
        er relevant for konteksten.
      </Popover>
    </Popover.TriggerContext>
  ),
};
