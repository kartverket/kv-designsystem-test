import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  component: Heading,
  title: 'Components/Typography/Heading',
  parameters: { layout: 'centered' },
  argTypes: {
    'data-size': {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Dette er en overskrift',
  }
};

export const Sizes: Story = {
  render: () => (
    <>
      <Heading data-size='2xl' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift 2xl
      </Heading>
      <Heading data-size='xl' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift xl
      </Heading>
      <Heading data-size='lg' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift lg
      </Heading>
      <Heading data-size='md' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift md
      </Heading>
      <Heading data-size='sm' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift sm
      </Heading>
      <Heading data-size='xs' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift xs
      </Heading>
      <Heading data-size='2xs' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift 2xs
      </Heading>
    </>
  )
};
