import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Header } from './';
import { Divider } from '../divider/Divider';
import { Avatar } from '../avatar/Avatar';
import { LanguageIcon } from '@navikt/aksel-icons';


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
              aria-current='page'
          >
            Lenkeknapp 
          </Header.NavItem>
        </Header.Nav>

        <Button asChild variant='tertiary' data-show-from='md'>
          <a
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
          >
            <LanguageIcon aria-hidden />Språk
          </a>
        </Button>
        <Button variant='tertiary' style={{ display: 'flex', padding: '0 var(--ds-size-2)', gap: 'var(--ds-size-2)' }}>
            <Avatar aria-label='none' data-size='xs' style={{fontSize: '12px'}}/>
            <span data-show-from='lg'>Ola Nordmann</span>
        </Button>

        <Header.MenuButton data-hide-from='lg' />
        <Header.Menu data-hide-from='lg'>
          <div className='header-menu-actions' data-hide-from='md'>
            {/* <Button variant='tertiary' style={{ display: 'flex', paddingBlock: '0', gap: 'var(--ds-size-2)' }}>
                <Avatar aria-label='none' initials='ON' data-size='sm'/>
                <span>Ola Nordmann</span>
            </Button> */}
            <Button asChild variant='tertiary'>
              <a
                href='https://www.kartverket.no/'
                rel='noreferrer'
                target='_blank'
              >
                <LanguageIcon aria-hidden />Språk
              </a>
            </Button>
            {/* <Button asChild variant='secondary'>
              <a
                href='https://www.kartverket.no/'
                rel='noreferrer'
                target='_blank'
              >
                Logg inn
              </a>
            </Button> */}
          </div>
          <Divider data-hide-from='md' />
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
                aria-current='page'
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
