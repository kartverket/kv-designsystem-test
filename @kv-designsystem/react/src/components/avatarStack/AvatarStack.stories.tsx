import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarStack, type AvatarStackProps } from './AvatarStack';
import { Avatar } from '../avatar/Avatar';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import { Label } from '../typography/label/Label';
import { Tooltip } from '@digdir/designsystemet-react';
import { AvatarStack as StorybookAvatarStack } from './docs/StorybookAvatarStack';

const meta = {
  component: StorybookAvatarStack,
  parameters: { layout: 'centered' },
} satisfies Meta<AvatarStackProps>;

export default meta;
type Story = StoryObj<AvatarStackProps>;

const profileImage1 = 'https://plus.unsplash.com/premium_vector-1742287110563-6d581a1d05a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const profileImage2 = 'https://plus.unsplash.com/premium_vector-1711987772726-64785d1bade8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const profileImage3 = 'https://plus.unsplash.com/premium_vector-1742745355047-19c0522bd136?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const profileImage4 = 'https://images.unsplash.com/vector-1769285072660-14d79a887aad?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Preview: Story = {
  render: (args) => (
    <AvatarStack {...args}>
      <Avatar aria-label='Person'>
        <img src={profileImage1} alt='' />
      </Avatar>
      <Avatar aria-label='Briefcase'>
        <BriefcaseIcon />
      </Avatar>
      <Avatar aria-label='Søren Magnussen' initials='sm' />
      <Avatar aria-label='Mark Downright' initials='md' />
      <Avatar aria-label='Ola Nordman' initials='on' />
    </AvatarStack>
  )
};

export const Playground: Story = {
  parameters: { layout: 'padded' },
  render: (_args) => {
    const [expandable, setExpandable] = useState<undefined | true>(undefined);
    const [square, setSquare] = useState(false);
    const [size, setSize] = useState(64);
    const [overlap, setOverlap] = useState(50);
    const [gap, setGap] = useState(2);
    const labelStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
      accentColor: 'var(--ds-color-base-default)',
    } as const;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-8)',
          minHeight: '395px',
          width: 'min(100%, 500px)',
          justifySelf: 'center',
        }}
      >
        <fieldset
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--ds-size-4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-3)',
              alignItems: 'center',
            }}
          >
            <Checkbox
              label='Expandable'
              checked={expandable !== undefined}
              onChange={() => setExpandable((prev) => (prev ? undefined : true))}
            />
            <Checkbox
              label='square'
              checked={square}
              onChange={() => setSquare((prev) => !prev)}
            />
          </div>
          <Label style={labelStyle}>
            Size {`${size}px`}
            <input
              min='24'
              max='150'
              step='0.1'
              type='range'
              value={size}
              onChange={(e) =>
                setSize(Number((e.target as HTMLInputElement).value))
              }
            />
          </Label>
          <Label style={labelStyle}>
            Overlap {`${overlap}%`}
            <input
              min='-10'
              max='100'
              step='1'
              type='range'
              value={overlap}
              onChange={(e) =>
                setOverlap(Number((e.target as HTMLInputElement).value))
              }
            />
          </Label>
          <Label style={labelStyle}>
            Gap {`${gap}px`}
            <input
              min='0'
              max='15'
              step='1'
              type='range'
              value={gap}
              onChange={(e) =>
                setGap(Number((e.target as HTMLInputElement).value))
              }
            />
          </Label>
        </fieldset>

        <AvatarStack
          overlap={overlap}
          data-suffix={`+10`}
          gap={`${gap}px`}
          avatarSize={`${size}px`}
          expandable={expandable}
        >
          <Avatar aria-label='profile a' variant={square ? 'square' : 'circle'}>
            <img src={profileImage1} alt='' />
          </Avatar>
          <Avatar aria-label='profile b' variant={square ? 'square' : 'circle'}>
            <img src={profileImage2} alt='' />
          </Avatar>
          <Avatar aria-label='profile c' variant={square ? 'square' : 'circle'}>
            md
          </Avatar>
          <Avatar aria-label='profile d' variant={square ? 'square' : 'circle'}>
            <img src={profileImage3} alt='' />
          </Avatar>
          <Avatar aria-label='profile e' variant={square ? 'square' : 'circle'}>
            <img src={profileImage4} alt='' />
          </Avatar>
        </AvatarStack>
      </div>
    );
  },
};

export const DataSize: Story = {
  render: (_args) => (
    <AvatarStack avatarSize='clamp(5rem, 1.5rem + 2vw, 10rem)'>
      <Avatar aria-label=''>
        <img src={profileImage1} alt='' />
      </Avatar>
      <Avatar aria-label=''>
        <img src={profileImage2} alt='' />
      </Avatar>
      <Avatar aria-label=''>
        <img src={profileImage3} alt='' />
      </Avatar>
      <Avatar aria-label=''>
        <img src={profileImage4} alt='' />
      </Avatar>
    </AvatarStack>
  )
};

export const Gap: Story = {
  args: {
    gap: 'var(--ds-size-1)',
  },
  render: Preview.render,
};

export const Expandable: Story = {
  render: (_args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--ds-size-4)',
        flexWrap: 'wrap',
      }}
    >
      <fieldset>
        <legend>expandable</legend>
        <AvatarStack expandable>
          <Avatar aria-label='Person'>
            <img src={profileImage1} alt='' />
          </Avatar>
          <Avatar aria-label='Briefcase'>
            <BriefcaseIcon />
          </Avatar>
          <Avatar aria-label='Søren Magnussen' initials='sm' />
          <Avatar aria-label='Mark Downright' initials='md' />
          <Avatar aria-label='Ola Nordman' initials='on' />
        </AvatarStack>
      </fieldset>
      <fieldset>
        <legend>expandable='fixed'</legend>
        <AvatarStack expandable='fixed'>
          <Avatar aria-label='Person'>
            <img src={profileImage1} alt='' />
          </Avatar>
          <Avatar aria-label='Briefcase'>
            <BriefcaseIcon />
          </Avatar>
          <Avatar aria-label='Søren Magnussen' initials='sm' />
          <Avatar aria-label='Mark Downright' initials='md' />
          <Avatar aria-label='Ola Nordman' initials='on' />
        </AvatarStack>
      </fieldset>
    </div>
  )
};

export const Square: Story = {
  args: {
    expandable: true,
    overlap: 40,
  },
  render: (args) => (
    <AvatarStack {...args}>
      <Avatar variant='square' aria-label='Person'>
        <img src={profileImage1} alt='' />
      </Avatar>
      <Avatar variant='square' aria-label='Briefcase'>
        <BriefcaseIcon />
      </Avatar>
      <Avatar variant='square' aria-label='Søren Magnussen' initials='sm' />
      <Avatar variant='square' aria-label='Mark Downright' initials='md' />
      <Avatar variant='square' aria-label='Ola Nordman' initials='on' />
    </AvatarStack>
  ),
};

export const AdditionalAvatars: Story = {
  args: {
    overlap: 30,
  },
  render: (args) => (
    <>
      <AvatarStack {...args}>
        <Avatar aria-label=''>
          <img src={profileImage1} alt='' />
        </Avatar>
        <Avatar aria-label=''>
          <BriefcaseIcon />
        </Avatar>
        <Avatar aria-label='' initials='sm' />
        <Avatar
          data-color='neutral'
          aria-label=''
          style={{ '--dsc-avatar-font-size': '1.1rem' } as React.CSSProperties}
        >
          +14
        </Avatar>
      </AvatarStack>
      <AvatarStack suffix={'+14'}>
        <Avatar aria-label=''>
          <img src={profileImage1} alt='' />
        </Avatar>
        <Avatar aria-label=''>
          <BriefcaseIcon />
        </Avatar>
        <Avatar aria-label='' initials='sm' />
        <Avatar aria-label='' initials='on' />
      </AvatarStack>
    </>
  ),
};

export const WithTooltipAndLink: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-4)' }}>
      <fieldset>
        <legend>Link + Tooltip</legend>
        <AvatarStack overlap={30} aria-label='bidragsytere'>
          <Tooltip content='Snille Simen'>
            <Avatar aria-label='' asChild>
              <a href='#'>
                <img src={profileImage1} alt='' />
              </a>
            </Avatar>
          </Tooltip>
          <Tooltip content='Rånete Randi'>
            <Avatar aria-label='' asChild>
              <a href='#'>
                <img src={profileImage2} alt='' />
              </a>
            </Avatar>
          </Tooltip>
          <Tooltip content='Tøffe Tommy'>
            <Avatar aria-label='' asChild>
              <a href=''>
                <img src={profileImage3} alt='' />
              </a>
            </Avatar>
          </Tooltip>
          <Tooltip content='Artige Astrid'>
            <Avatar aria-label='' asChild>
              <a href=''>AA</a>
            </Avatar>
          </Tooltip>
        </AvatarStack>
      </fieldset>
      <fieldset>
        <legend>Link + Tooltip expandable</legend>
        <AvatarStack
          overlap={50}
          expandable='fixed'
          aria-label='bidragsytere'
        >
          <Tooltip content='Snille Simen'>
            <Avatar aria-label='' asChild>
              <a href='#'>
                <img src={profileImage1} alt='' />
              </a>
            </Avatar>
          </Tooltip>
          <Tooltip content='Rånete Randi'>
            <Avatar aria-label='' asChild>
              <a href='#'>
                <img src={profileImage2} alt='' />
              </a>
            </Avatar>
          </Tooltip>
          <Tooltip content='Tøffe Tommy'>
            <Avatar aria-label='' asChild>
              <a href=''>
                <img src={profileImage3} alt='' />
              </a>
            </Avatar>
          </Tooltip>
          <Tooltip content='Artige Astrid'>
            <Avatar aria-label='' asChild>
              <a href=''>AA</a>
            </Avatar>
          </Tooltip>
        </AvatarStack>
      </fieldset>
    </div>
  )
};
