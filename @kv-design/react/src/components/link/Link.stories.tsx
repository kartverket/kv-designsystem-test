import preview from '../../../.storybook/preview';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  component: Link,
  tags: ['alfa', 'digdir'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: undefined,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story ={
  args: {
    href: 'https://www.kartverket.no/',
    children: 'Gå til kartverket.no',
  },
};

export const InText:  Story = {
  render: (args) => (
    <p>
      Designsystemet må ses i sammenheng med{' '}
      <Link href="https://www.kartverket.no/" {...args}>
        Kartverket
      </Link>
      .
    </p>
  ),
};