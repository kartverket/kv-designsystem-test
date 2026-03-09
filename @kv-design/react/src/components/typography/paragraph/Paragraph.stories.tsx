import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from './Paragraph';

const meta = {
  component: Paragraph,
  title: 'Components/Typography/Paragraph',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Paragraph',
  },
  render: (args) => (
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed sodales lacus. 
      Nullam varius erat sit amet arcu fringilla eleifend. Aenean dictum libero leo, 
      vitae consequat augue luctus vel.
    </Paragraph>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Paragraph data-size='xl'>Dette er en xl paragraf</Paragraph>
      <Paragraph data-size='lg'>Dette er en lg paragraf</Paragraph>
      <Paragraph data-size='md'>Dette er en md paragraf</Paragraph>
      <Paragraph data-size='sm'>Dette er en sm paragraf</Paragraph>
      <Paragraph data-size='xs'>Dette er en xs paragraf</Paragraph>
    </>
  )
};
