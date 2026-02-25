import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta = {
  component: Spinner,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
// TODO: had to change to <typeof Spinner> to avoid decorators: [] to cast error on args
type Story = StoryObj<typeof Spinner>; 

export const Preview: Story = {
  args: {
    'aria-label': 'Laster...',
  },
};

export const Sizes: Story = {
  args: {
    'aria-label': 'Laster...'
  },
  render: (args) => (
    <>
      <Spinner {...args} data-size='2xs' />
      <Spinner {...args} data-size='xs' />
      <Spinner {...args} data-size='sm' />
      <Spinner {...args} data-size='md' />
      <Spinner {...args} data-size='lg' />
      <Spinner {...args} data-size='xl' />
    </>
  )
};

export const Colors: Story = {
  args: {
    'aria-label': 'Laster...',
    'data-size': 'xl',
  },
  render: (args) => (
    <>
      <Spinner {...args} data-color='neutral' />
      <Spinner {...args} data-color='accent' />
      <Spinner {...args} data-color='support-1' />
      <Spinner {...args} data-color='support-2' />
    </>
  )
};

export const WithText: Story = {
  render: () => (
    <>
      <Spinner aria-label='Laster...' data-size='sm' />
      <Paragraph>Forbereder filen din</Paragraph>
    </>
  )
};

