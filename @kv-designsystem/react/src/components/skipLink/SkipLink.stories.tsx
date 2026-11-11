import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { SkipLink } from './SkipLink';

const meta = {
  title: 'Komponenter/SkipLink',
  component: SkipLink,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO:  fix that when clicking link it goes direktly to main content (see udir with scrollHashBehavior)
export const Preview: Story = {
  args: {
    children: undefined,
    href: '#main-content',
  },
  render: (args) => (
    <>
      <Paragraph>
        Tab til, eller klikk inni dette eksempelet og trykk <kbd>Tab</kbd>.
        <SkipLink {...args}>Hopp til hovedinnholdet</SkipLink>
      </Paragraph>
      <main id="main-content" tabIndex={-1}>
        Region som kan motta fokus fra SkipLink.
      </main>
    </>
  ),
};
