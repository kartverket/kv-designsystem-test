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
      <Header.Button asChild>
        <a
          href="https://www.kartverket.no/"
          rel="noreferrer"
          target="_blank"
        >
          Lenkeknapp 
         </a>
      </Header.Button>

      <Header.Button asChild variant='secondary'>
        <a
          href="https://www.kartverket.no/"
          rel="noreferrer"
          target="_blank"
        >
          Logg inn
         </a>
      </Header.Button>
    </Header>
  )
};
