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
      <Header.NavList>
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
      </Header.NavList>

      <Header.Actions>
        <Button asChild variant='secondary'>
          <a
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
          >
            Logg inn
          </a>
        </Button>
      </Header.Actions>
    </Header>
  )
};
