import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const profileImage = '';

export const Preview: Story = {
  args: { 
    'aria-label': 'Ola Nordmann',
    children: '',
   },
  render: (args) => (
    <>
    <Avatar {...args}>
      {/* <img src={profileImage} alt="" /> */}
    </Avatar>
    </>
  ),
};
