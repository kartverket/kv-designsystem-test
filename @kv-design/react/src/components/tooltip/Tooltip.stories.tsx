import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';

const meta = {
  component: Tooltip,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Tooltip',
    content:'Tooltip',
  },
  render: (args) => (
    <Tooltip content='Kopier' placement='top'>
      <Button icon aria-label='Kopier'>
        Icon
        {/* <FilesIcon aria-hidden /> */}
      </Button>
    </Tooltip>
  ),
};
