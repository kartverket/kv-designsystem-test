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

export const WithMenu: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  render: (args) => (
    <Header {...args}>
      <Header.Nav data-show-from='lg'>
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
      <Button asChild variant='secondary' data-show-from='md'>
        <a
          href='https://www.kartverket.no/'
          rel='noreferrer'
          target='_blank'
        >
          Logg inn
        </a>
      </Button>

      <Header.MenuButton data-hide-from='lg' />
      <Header.Menu>
        <Button asChild variant='secondary'>
          <a
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
          >
            Logg inn
          </a>
        </Button>
        <Header.Nav>
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
      </Header.Menu>
    </Header>
  )
};

export const WithNavigationLinksAndButtons: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  render: (args) => (
    <>
      <style>
        {`
          .header-menu-actions {
            display: flex;
            justify-content: flex-end;
            gap: var(--ds-size-5);

            * {
              display: inline-block;
              flex-shrink: 1;
              width: fit-content;
            }
          }
        `}
      </style>
      <Header {...args}>
        <Header.Nav data-show-from='lg'>
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
        <Button asChild variant='tertiary' data-show-from='lg'>
          <a
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
          >
            Språk
          </a>
        </Button>
        <Button asChild variant='secondary' data-show-from='lg'>
            <a
              href='https://www.kartverket.no/'
              rel='noreferrer'
              target='_blank'
            >
              Logg inn
            </a>
          </Button>

        <Header.MenuButton data-hide-from='lg' />
        <Header.Menu>
          <div className='header-menu-actions' data-hide-from='lg'>
            <Button asChild variant='tertiary'>
              <a
                href='https://www.kartverket.no/'
                rel='noreferrer'
                target='_blank'
              >
                Språk
              </a>
            </Button>
            <Button asChild variant='secondary'>
              <a
                href='https://www.kartverket.no/'
                rel='noreferrer'
                target='_blank'
              >
                Logg inn
              </a>
            </Button>
          </div>
          <Header.Nav>
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
        </Header.Menu>
      </Header>
    </>
  )
};
