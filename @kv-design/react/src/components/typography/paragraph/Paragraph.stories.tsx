import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from './Paragraph';

const meta = {
  component: Paragraph,
  title: 'Components/Typography/Paragraph',
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
      <Paragraph data-size='xl'>This is an xl paragraph</Paragraph>
      <Paragraph data-size='lg'>This is a lg paragraph</Paragraph>
      <Paragraph data-size='md'>This is a md paragraph</Paragraph>
      <Paragraph data-size='sm'>This is a sm paragraph</Paragraph>
      <Paragraph data-size='xs'>This is an xs paragraph</Paragraph>
    </>
  )
};
