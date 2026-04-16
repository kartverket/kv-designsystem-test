import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './';

const meta = {
  component: Header
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    applicationName: 'Tjenestetittel'
  },
  render: (args) => (
    <Header {...args} >
      <Header.Item
          href='https://www.kartverket.no'
          rel='noreferrer'
          target='_blank'
          typeof='button' 
      >
        Tjenesteside 1
      </Header.Item>
      {/* En hamburgerermeny er en knapp? */}
    </Header>
  )
};
