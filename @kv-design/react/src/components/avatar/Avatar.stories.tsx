import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Dropdown } from '../dropdown/Dropdown';
import { Badge } from '../badge/Badge';
import { Link } from '../link/Link';

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
    // children: '',
   },
  render: (args) => (
    <>
    <Avatar {...args}>
      {/* TODO: Remove this? Add an image or keep it with default icon? */}
      {/* <img src={profileImage} alt='' /> */}
    </Avatar>
    </>
  ),
};

// TODO: add spacing between icons
export const Content: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
  },
  render: (args) => (
    <>
    <Avatar {...args} />
    {/* TODO: fix so avatar is aligned with the others */}
    <Avatar {...args} initials='ON'/>
    {/* TODO: add icon, briefcase? */}
    <Avatar {...args} /> 
    {/* TODO: add image */}
    <Avatar {...args} />
    </>
  ),
}

export const Sizes: Story = {
  args: {
    'aria-label': 'Ola Nordmann'
  },
  render: (args) => (
    <>
    <Avatar {...args} data-size='xs' aria-label='extra small' initials='xs' />
    <Avatar {...args} data-size='sm' aria-label='small' initials='sm' />
    <Avatar {...args} data-size='md' aria-label='medium' initials='md' />
    <Avatar {...args} data-size='lg' aria-label='large' initials='lg' />
    </>
  )
}

export const ColorVariants: Story = {
  args: {
    'aria-label': 'Ola Nordmann'
  },
  render: (args) => (
    <>
    <Avatar {...args} data-color='neutral' aria-label='color neutral' />
    <Avatar {...args} data-color='accent' aria-label='color accent' />
    <Avatar {...args} data-color='support-1' aria-label='color support-1' />
    <Avatar {...args} data-color='support-2' aria-label='color support-2' />
    </>
  )
}

export const Shapes: Story = {
  args: {
    'aria-label': 'Ola Nordmann'
  },
  render: (args) => (
    <>
    <Avatar {...args} variant='circle' aria-label='variant circle' />
    <Avatar {...args} variant='square' aria-label='variant square' />
    <Avatar {...args} variant='circle' aria-label='Ola Nordmann' initials='ON'/>
    <Avatar {...args} variant='square' aria-label='Ola Nordmann' initials='ON'/>
    </>
  )
}

export const InDropdown: Story = {
  args: {
    'aria-label': 'Ola Nordmann'
  },
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger variant='tertiary'>
        <Avatar aria-hidden='true' data-size='sm' initials='ON' />
        Ola Nordmann
      </Dropdown.Trigger>
      <Dropdown placement='bottom-end' autoPlacement={false} data-size='md'>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>
              <Badge.Position overlap='circle'>
                <Badge data-color='danger' data-size='sm'></Badge>
                <Avatar aria-hidden='true' data-size='xs' initials='ON' />
              </Badge.Position>
              Ola Nordmann
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>
              <Avatar aria-hidden='true' data-size='xs'>
                {/* <BriefcaseIcon /> */}
              </Avatar>
              Sogndal kommune
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  )
}

export const AsLink: Story = {
  args: {
    'aria-hidden': true,
  },
  render: (args) => (
    <Link
      href='https://www.kartverket.no/'
      style={{ display: 'flex', gap: 'var(--ds-size-2)', alignItems: 'center' }}
    >
      <Avatar {...args} />
      <span>Ola Nordmann</span>
    </Link>
  ),
};