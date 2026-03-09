import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Dropdown } from '../dropdown/Dropdown';
import { Badge } from '../badge/Badge';
import { Link } from '../link/Link';
import { BriefcaseIcon, ChevronUpIcon } from '@navikt/aksel-icons';

// TODO: fix styling to be implemented the same across all components
const meta: Meta<typeof Avatar> = {
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
   },
  render: (args) => (
    <Avatar {...args} />
  ),
};

const profileImage = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Content: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
  },
  render: (args) => (
    <>
    <Avatar {...args} />
    <Avatar {...args} initials='ON'/>
    <Avatar {...args}>
      <BriefcaseIcon />
    </Avatar> 
    <Avatar {...args}>
      <img src={profileImage} alt="" />
    </Avatar>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
    <Avatar  data-size='xs' aria-label='extra small' initials='xs' />
    <Avatar  data-size='sm' aria-label='small' initials='sm' />
    <Avatar  data-size='md' aria-label='medium' initials='md' />
    <Avatar  data-size='lg' aria-label='large' initials='lg' />
    </>
  )
};

export const ColorVariants: Story = {
  render: () => (
    <>
    <Avatar data-color='neutral' aria-label='color neutral' />
    <Avatar  data-color='accent' aria-label='color accent' />
    <Avatar  data-color='support-1' aria-label='color support-1' />
    <Avatar  data-color='support-2' aria-label='color support-2' />
    </>
  )
};

export const Shapes: Story = {
  render: () => (
    <>
    <Avatar variant='circle' aria-label='variant circle' />
    <Avatar variant='square' aria-label='variant square' />
    <Avatar variant='circle' aria-label='Ola Nordmann' initials='ON'/>
    <Avatar variant='square' aria-label='Ola Nordmann' initials='ON'/>
    </>
  )
};

export const InDropdown: Story = {
  render: () => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger variant='tertiary'>
        <Avatar aria-hidden='true' data-size='sm' initials='ON' />
        Ola Nordmann
        <ChevronUpIcon />
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
                <BriefcaseIcon />
              </Avatar>
              Sogndal kommune
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  )
};

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
