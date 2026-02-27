import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
  parameters: {layout: 'centered'},
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

export const Content: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
    initials: 'ON',
   },
  render: (args) => (
    <Avatar {...args}>
      {/* <img src={profileImage} alt="" /> */}
    </Avatar>
  ),
};
