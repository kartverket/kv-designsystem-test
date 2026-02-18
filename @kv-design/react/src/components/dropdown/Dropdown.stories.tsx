import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';

const meta = {
  component: Dropdown,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Dropdown',
  },
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
      <Dropdown placement='bottom-end'>
        <Dropdown.Heading>First heading</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Button 1.1</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Button 1.2</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
        <Dropdown.Heading>Second heading</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Button 2.1</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Button 2.2</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};
