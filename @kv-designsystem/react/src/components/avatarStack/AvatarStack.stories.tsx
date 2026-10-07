import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarStack, type AvatarStackProps } from './AvatarStack';
import { Avatar } from '../avatar/Avatar';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import { Field } from '../field/Field';
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
      <li>
        <Avatar aria-label='Snille Simen'>
          <img src={profileImage1} aria-hidden />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label='Ole Nordmann'>
          <BriefcaseIcon aria-hidden />
        </Avatar>
      </li>
      <li><Avatar aria-label='Søren Magnussen'>sm</Avatar></li>
      <li><Avatar aria-label='Mark Downright'>md</Avatar></li>
      <li><Avatar aria-label='Ola Nordman'>on</Avatar></li>
    </AvatarStack>
  )
};

export const Playground: Story = {
  parameters: { layout: 'padded' },
  render: (_args) => {
    const [expandable, setExpandable] = useState(false);
    const [overlap, setOverlap] = useState(32);
    const [radius, setRadius] = useState(32);
    const [size, setSize] = useState(64);
    const [gap, setGap] = useState(2);
    const inputStyle = {
      width: '100%',
      accentColor: 'var(--ds-color-base-default)',
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-8)',
          minHeight: '395px',
          width: 'min(100%, 500px)',
          justifySelf: 'center',
        }}>
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
              checked={expandable}
              onChange={() => setExpandable(!expandable)}
            />
          </div>
          <Field>
            <Label>Size {`${size}px`}</Label>
            <input
              style={inputStyle}
              min='24'
              max='150'
              step='0.1'
              type='range'
              value={size}
              onChange={(e) => setSize(e.target.valueAsNumber)}
            />
          </Field>
          <Field>
            <Label>Overlap {`${overlap}px`}</Label>
            <input
              style={inputStyle}
              min='0'
              max='100'
              step='1'
              type='range'
              value={overlap}
              onChange={(e) => setOverlap(e.target.valueAsNumber)}
            />
          </Field>
          <Field>
            <Label>Gap {`${gap}px`}</Label>
            <input
              style={inputStyle}
              min='0'
              max='15'
              step='1'
              type='range'
              value={gap}
              onChange={(e) => setGap(e.target.valueAsNumber)}
            />
          </Field>
          <Field>
            <Label>Radius {`${radius}px`}</Label>
            <input
              style={inputStyle}
              min='0'
              max='75'
              step='1'
              type='range'
              value={radius}
              onChange={(e) => setRadius(e.target.valueAsNumber)}
            />
          </Field>
        </fieldset>
        <AvatarStack
          expandable={expandable || undefined}
          style={
            {
              '--dsc-avatar-stack-size': `${size}px`,
              '--dsc-avatar-stack-gap': `${gap}px`,
              '--dsc-avatar-stack-overlap': `${overlap}px`,
              '--dsc-avatar-stack-radius': `${radius}px`,
            } as React.CSSProperties
          }
        >
          <li>
            <Avatar aria-label='Snille Simen'>
              <img src={profileImage1} aria-hidden />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label='Rånete Randi'>
              <img src={profileImage2} aria-hidden />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label='Mark Downright'>md</Avatar>
          </li>
          <li>
            <Avatar aria-label='Tøffe Tommy'>
              <img src={profileImage3} aria-hidden />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label='Artige Astrid'>
              <img src={profileImage4} aria-hidden />
            </Avatar>
          </li>
          <li>+10</li>
        </AvatarStack>
      </div>
    );
  },
};

export const DataSize: Story = {
  render: (_args) => (
    <AvatarStack
      style={
        {
          '--dsc-avatar-stack-size': 'clamp(5rem, 1.5rem + 2vw, 10rem)',
        } as React.CSSProperties
      }
    >
      <li>
        <Avatar aria-label='Snille Simen'>
          <img src={profileImage1} aria-hidden />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label='Rånete Randi'>
          <img src={profileImage2} aria-hidden />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label='Tøffe Tommy'>
          <img src={profileImage3} aria-hidden />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label='Artige Astrid'>
          <img src={profileImage4} aria-hidden />
        </Avatar>
      </li>
    </AvatarStack>
  )
};

export const Gap: Story = {
  args: {
    style: { '--dsc-avatar-stack-gap': 'var(--ds-size-1)' } as React.CSSProperties,
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
          <li>
            <Avatar aria-label='Snille Simen'>
              <img src={profileImage1} aria-hidden />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label='Ola Nordmann'>
              <BriefcaseIcon aria-hidden />
            </Avatar>
          </li>
          <li><Avatar aria-label='Søren Magnussen'>sm</Avatar></li>
          <li><Avatar aria-label='Mark Downright'>md</Avatar></li>
          <li><Avatar aria-label='Ola Nordman'>on</Avatar></li>
        </AvatarStack>
      </fieldset>
      <fieldset>
        <legend>expandable='fixed'</legend>
        <AvatarStack expandable='fixed'>
          <li>
            <Avatar aria-label='Snille Simen'>
              <img src={profileImage1} aria-hidden />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label='Ola Nordmann'>
              <BriefcaseIcon aria-hidden />
            </Avatar>
          </li>
          <li><Avatar aria-label='Søren Magnussen'>sm</Avatar></li>
          <li><Avatar aria-label='Mark Downright'>md</Avatar></li>
          <li><Avatar aria-label='Ola Nordman'>on</Avatar></li>
        </AvatarStack>
      </fieldset>
    </div>
  )
};

export const Square: Story = {
  args: {
    expandable: true,
    style: { '--dsc-avatar-stack-radius': 'var(--ds-border-radius-md)' } as React.CSSProperties,
  },
  render: (args) => (
    <AvatarStack {...args}>
      <li>
        <Avatar aria-label='Snille Simen'>
          <img src={profileImage1} aria-hidden />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label='Ola Nordmann'>
          <BriefcaseIcon aria-hidden />
        </Avatar>
      </li>
      <li><Avatar aria-label='Søren Magnussen'>sm</Avatar></li>
      <li><Avatar aria-label='Mark Downright'>md</Avatar></li>
      <li><Avatar aria-label='Ola Nordman'>on</Avatar></li>
    </AvatarStack>
  ),
};

export const AdditionalAvatars: Story = {
  render: (_args) => (
    <>
      <AvatarStack>
        <li>
          <Avatar aria-label='Snille Simen'>
            <img src={profileImage1} aria-hidden />
          </Avatar>
        </li>
        <li>
          <Avatar aria-label='Ola Nordmann'>
            <BriefcaseIcon aria-hidden />
          </Avatar>
        </li>
        <li><Avatar aria-label='Søren Magnussen'>sm</Avatar></li>
        <li>
          <Avatar
            data-color='neutral'
            aria-label='14 flere personer'
            style={{ '--dsc-avatar-font-size': '1.1rem' } as React.CSSProperties}
          >
            +14
          </Avatar>
        </li>
      </AvatarStack>
      <AvatarStack>
        <li>
          <Avatar aria-label='Snille Simen'>
            <img src={profileImage1} aria-hidden />
          </Avatar>
        </li>
        <li>
          <Avatar aria-label='Ola Nordmann'>
            <BriefcaseIcon aria-hidden />
          </Avatar>
        </li>
        <li><Avatar aria-label='Søren Magnussen'>sm</Avatar></li>
        <li><Avatar aria-label='Ola Nordmann'>on</Avatar></li>
        <li aria-label='14 flere personer'>+14</li>
      </AvatarStack>
    </>
  ),
};

export const WithTooltipAndLink: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-4)' }}>
      <fieldset>
        <legend>Link + Tooltip</legend>
        <AvatarStack aria-label='bidragsytere'>
          <li>
            <Tooltip content='Snille Simen'>
              <Avatar aria-label='Snille Simen' asChild>
                <a href='#'>
                  <img src={profileImage1} aria-hidden/>
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content='Rånete Randi'>
              <Avatar aria-label='Rånete Randi' asChild>
                <a href='#'>
                  <img src={profileImage2} aria-hidden />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content='Tøffe Tommy'>
              <Avatar aria-label='Tøffe Tommy' asChild>
                <a href=''>
                  <img src={profileImage3} aria-hidden />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content='Artige Astrid'>
              <Avatar aria-label='Artige Astrid' asChild>
                <a href=''>AA</a>
              </Avatar>
            </Tooltip>
          </li>
        </AvatarStack>
      </fieldset>
      <fieldset>
        <legend>Link + Tooltip expandable</legend>
        <AvatarStack
          expandable='fixed'
          aria-label='bidragsytere'
        >
          <li>
            <Tooltip content='Snille Simen'>
              <Avatar aria-label='Snille Simen' asChild>
                <a href='#'>
                  <img src={profileImage1} aria-hidden />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content='Rånete Randi'>
              <Avatar aria-label='Rånete Randi' asChild>
                <a href='#'>
                  <img src={profileImage2} aria-hidden />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content='Tøffe Tommy'>
              <Avatar aria-label='Tøffe Tommy' asChild>
                <a href=''>
                  <img src={profileImage3} aria-hidden />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content='Artige Astrid'>
              <Avatar aria-label='Artige Astrid' asChild>
                <a href=''>AA</a>
              </Avatar>
            </Tooltip>
          </li>
        </AvatarStack>
      </fieldset>
    </div>
  )
};
