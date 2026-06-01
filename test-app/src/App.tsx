
import { Header } from '@kv-designsystem/react'
import { Avatar } from '@kv-designsystem/react'
import { Divider } from '@kv-designsystem/react'
import { Button } from '@kv-designsystem/react'
import '@kv-designsystem/css/green'
import './App.css'

function App() {

  return (
    <>
 {console.log(Header)}
  <Header applicationName='Tjenestetittel' applicationHref='https://eiendomsregisteret.kartverket.no/'>
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
        
        <Button asChild variant='tertiary' data-show-from='md'>
          <a
            href='https://www.kartverket.no/'
            rel='noreferrer'
            target='_blank'
          >
            Språk
          </a>
        </Button>
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
        <Header.Menu data-hide-from='lg'>
          <div className='header-menu-actions' data-hide-from='md'>
            <Button variant='tertiary' style={{ display: 'flex', paddingBlock: '0', gap: 'var(--ds-size-2)' }}>
                <Avatar aria-label='none' initials='ON' data-size='sm'/>
                <span>Ola Nordmann</span>
            </Button>
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
}

export default App
