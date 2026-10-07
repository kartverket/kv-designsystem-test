import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, type AvatarProps } from './Avatar';
import { Dropdown } from '../dropdown/Dropdown';
import { Badge } from '../badge/Badge';
import { Link } from '../link/Link';
import { BriefcaseIcon, ChevronUpIcon } from '@navikt/aksel-icons';

const meta = {
  component: Avatar,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<AvatarProps>;

export default meta;
type Story = StoryObj<AvatarProps>;

export const Preview: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
  },
};

const profileImage = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Content: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
  },
  render: (args: AvatarProps) => (
    <>
      <Avatar {...args} />
      <Avatar {...args}>on</Avatar>
      <Avatar {...args}>
        <BriefcaseIcon aria-hidden />
      </Avatar>
      <Avatar {...args}>
        <img src={profileImage} aria-hidden/>
      </Avatar>
    </>
  ),
};

export const Sizes: Story = {
  render: (_args: AvatarProps) => (
    <>
      <Avatar data-size='xs' aria-label='extra small'>xs</Avatar>
      <Avatar data-size='sm' aria-label='small'>sm</Avatar>
      <Avatar data-size='md' aria-label='medium'>md</Avatar>
      <Avatar data-size='lg' aria-label='large'>lg</Avatar>
    </>
  )
};

export const ColorVariants: Story = {
  render: (_args: AvatarProps) => (
    <>
      <Avatar data-color='neutral' aria-label='color neutral' />
      <Avatar data-color='accent' aria-label='color accent' />
      <Avatar data-color='support-1' aria-label='color support-1' />
      <Avatar data-color='support-2' aria-label='color support-2' />
    </>
  )
};

export const Shapes: Story = {
  render: (_args: AvatarProps) => (
    <>
      <Avatar aria-label='radius default' />
      <Avatar
        aria-label='radius 1rem'
        style={
          {
            '--dsc-avatar-radius': '1rem',
          } as React.CSSProperties
        }
      />
      <Avatar
        aria-label='radius lg'
        style={
          {
            '--dsc-avatar-radius': 'var(--ds-border-radius-lg)',
          } as React.CSSProperties
        }
      >
        ON
      </Avatar>
      <Avatar
        aria-label='radius none'
        style={
          {
            '--dsc-avatar-radius': '0',
          } as React.CSSProperties
        }
      >
        ON
      </Avatar>
    </>
  )
};

export const InDropdown: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        height: '200px',
      }
    },
  },
  render: (_args: AvatarProps) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger variant='tertiary'>
        <Avatar aria-hidden='true' data-size='sm'>on</Avatar>
        Ola Nordmann
        <ChevronUpIcon aria-hidden='true' />
      </Dropdown.Trigger>
      <Dropdown placement='bottom-end' autoPlacement={false} data-size='md' open>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>
              <Badge.Position overlap='circle'>
                <Badge data-color='danger' data-size='sm' />
                <Avatar aria-hidden='true' data-size='xs'>on</Avatar>
              </Badge.Position>
              Ola Nordmann
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>
              <Avatar aria-hidden='true' data-size='xs' aria-label='Ola Nordmann'>
                <BriefcaseIcon aria-hidden/>
              </Avatar>
              Sogndal kommune
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};

export const AsLink: Story = {
  args: {
    'aria-hidden': true,
  },
  render: (args: AvatarProps) => (
    <Link
      href='#'
      style={{ display: 'flex', gap: 'var(--ds-size-2)', alignItems: 'center' }}
    >
      <Avatar {...args} />
      <span>Ola Nordmann</span>
    </Link>
  ),
};
