import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Header } from './';


const meta = {
  component: Header
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  render: (args) => (
    <Header {...args}>
      <Header.Nav data-show-from='md'>
        <Header.NavItem
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
        >
          Lenkeknapp 
        </Header.NavItem>
        <Header.NavItem
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
        >
          Lenkeknapp 
        </Header.NavItem>
      </Header.Nav>
      
      {/* Lage HeaderMenu og gjenbruke Header.NavItem til å ha inni. Lage Header.MenuButton. */}
      <Button asChild variant='secondary' data-hide-from='md'>
        <a
          href='https://www.kartverket.no/'
          rel='noreferrer'
          target='_blank'
        >
          Logg inn
        </a>
      </Button>
    </Header>
  )
};
