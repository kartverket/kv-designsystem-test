import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  component: Heading,
  tags: ['alfa', 'digdir'],
  parameters: {
    layout: 'centered',
    componentOrigin: {
      originator: 'digdir',
    },
  },
  
  argTypes: {
    'data-size': {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
  title: 'Components/Typography/Heading',
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Dette er en overskrift',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Heading data-size='2xl' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is a 2xl heading
      </Heading>
      <Heading data-size='xl' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is an xl heading
      </Heading>
      <Heading data-size='lg' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is a lg heading
      </Heading>
      <Heading data-size='md' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is a md heading
      </Heading>
      <Heading data-size='sm' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is a sm heading
      </Heading>
      <Heading data-size='xs' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is an xs heading
      </Heading>
      <Heading data-size='2xs' style={{ marginBottom: 'var(--ds-size-4)' }}>
        This is a 2xs heading
      </Heading>
    </>
  )
};
