import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkipLink } from './SkipLink';
import { Paragraph } from '../paragraph/Paragraph';

const meta = {
  component: SkipLink,
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'SkipLink',
    href: 'https://www.kartverket.no'
  },
  render: (args) => (
  <>
    <Paragraph>
      Tab til, eller klikk inni dette eksempelet og trykk <kbd>Tab</kbd>.
      <SkipLink {...args} href="#main-content">
        Hopp til hovedinnholdet
      </SkipLink>
    </Paragraph>
    <main id="main-content" tabIndex={-1}>
      Region som kan motta fokus fra SkipLink.
    </main>
  </>
),
};
