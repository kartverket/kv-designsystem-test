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
  render: (_args) => (
    <>
      <Heading level={1} data-size='2xl' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift 2xl
      </Heading>
      <Heading level={2} data-size='xl' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift xl
      </Heading>
      <Heading level={3} data-size='lg' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift lg
      </Heading>
      <Heading level={4} data-size='md' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift md
      </Heading>
      <Heading level={5} data-size='sm' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift sm
      </Heading>
      <Heading level={6} data-size='xs' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift xs
      </Heading>
      <Heading level={6} data-size='2xs' style={{ marginBottom: 'var(--ds-size-4)' }}>
        Overskrift 2xs
      </Heading>
    </>
  )
};
