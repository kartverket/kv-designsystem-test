import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Tooltip } from '../tooltip/Tooltip'
import { fn } from 'storybook/test';

const meta = {
  component: Button,
  tags: ['alpha', 'digdir'],
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Preview: Story = {
  args: {
    variant: 'primary',
    children: 'Knapp',
    icon: false,
    disabled: false,
  },
};

export const PrimaryButton: Story = {
  args: {
    ...Preview.args,
    variant: 'primary',
    children: 'Lagre',
  },
};

export const SecondaryButton: Story = {
  args: {
    ...Preview.args,
    variant: 'secondary',
    children: 'Avbryt',
  },
};

// TODO: add icon to the button
export const TertiaryButton: Story = {
  args: {
    ...Preview.args,
    variant: 'tertiary',
    children: 'Rediger',
  },
};

export const Colors: Story = {
  render: (args) => (
    <>
      <Button variant='primary' data-color='neutral' {...args}>
        Publiser
      </Button>
      <Button variant='secondary' data-color='neutral' {...args}>
        Lagre kladd
      </Button>
      <Button variant='tertiary' data-color='danger' {...args}>
        Slett
      </Button>
    </>
  )
}

// TODO: add icons and align horizontally
export const IconOnly: Story = {
  args: {
    variant: 'tertiary',
    'data-color': 'accent',
    icon: true,
  },
  render: (args) => (
    <>
      <Tooltip content='Legg til ny'>
        <Button {...args}>
          (Icon)
          {/* <PlusCircleIcon aria-hidden /> */}
        </Button>
      </Tooltip>
      <Tooltip content='Varslinger'>
        <Button {...args}>
          (Icon)
          {/* <BellIcon aria-hidden /> */}
        </Button>
      </Tooltip>
      <Tooltip content='Instillinger'>
        <Button {...args}>
          (Icon)
          {/* <CogIcon aria-hidden /> */}
        </Button>
      </Tooltip>
    </>
  ),
};

// TODO: add icons and align horizontally
export const TextAndIcon: Story = {
  args: {
    'data-color': 'accent',
  },
  render: (args) => (
    <>
      <Button variant='primary' {...args}>
        Start utfylling
        {/* <ArrowRightIcon aria-hidden /> */}
      </Button>
      <Button variant='secondary' {...args}>
        {/* <ArrowUndoIcon aria-hidden /> */}
        Angre
      </Button>
    </>
  ),
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <a target='_blank' rel='noreferrer' href='https://www.kartverket.no/'>
        Gå til kartverket.no
      </a>
    ),
  },
};



export const Loading: Story = {
  args: {
    loading: true,
    onClick: fn(),
  },
  render: (args) => (
    <>
      <Button variant='primary' {...args}>
        Laster...
      </Button>
      <Button variant='secondary' {...args}>
        Laster...
      </Button>
      <Button variant='tertiary' {...args}>
        Laster...
      </Button>
    </>
  )
};

