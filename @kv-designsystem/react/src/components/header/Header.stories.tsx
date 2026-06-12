import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Header } from './';
import { Divider } from '../divider/Divider';
import { Avatar } from '../avatar/Avatar';
import { LanguageIcon, MagnifyingGlassIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Heading } from '../typography/heading/Heading';
import { Dropdown } from '../dropdown/Dropdown';
import { Search } from '../search/Search';
import { useRef, useState } from 'react';

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
    <Header {...args} />
  )
};

export const WithNavigationLinks: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '250px',
      }
    },
  },
  render: (args) => (
    <>
      <Header {...args}>
        <Header.Nav data-show-from='md'>
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

        <Header.MenuButton data-hide-from='md' commandFor='with-navigation-links'/>
        <Header.Menu data-hide-from='md' id='with-navigation-links'>
          <Header.Nav>
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

export const WithMenu: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '420px',
      }
    },
  },
  render: (args) => (
    <>
      <style>
        {`
        .withMenu-header-sub-menu .ds-heading {
          margin-bottom: var(--ds-size-3);
        }
        .withMenu-header-sub-menu ul {
          margin-bottom: var(--ds-size-3);
        }
        `}
      </style>
      <Header {...args}>
        <Header.MenuButton commandFor='with-menu'/>
          <Header.Menu id='with-menu'>
            <Header.Nav>
              <li className='withMenu-header-sub-menu'>
                <Heading data-size='sm'>Temameny</Heading>
                <ul>
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
                </ul>
              </li>
              <li className='withMenu-header-sub-menu'>
                <Heading>Temameny</Heading>
                <ul>
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
                </ul>
              </li>
            </Header.Nav>
        </Header.Menu>
      </Header>
    </>
  )
};

export const WithButtonsAndMenu: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '400px',
      }
    },
  },
  render: (args) => (
    <>
      <style>
        {`
        .header-dialog-content:has(> .ds-search:[visible]) {
          max-width: 708px;
          width: 100%;
        }

        .withButtonsAndMenu-header-sub-menu .ds-heading {
          margin-bottom: var(--ds-size-3);
        }

        .withButtonsAndMenu-header-sub-menu ul {
          margin-bottom: var(--ds-size-3);
        }
        `}
      </style>
      <Header {...args}>
        <Header.ActionsList>
          <Button variant='tertiary' command='show-modal' commandFor='search-dialog' data-show-from='md'>
            <MagnifyingGlassIcon aria-hidden />
            Søk
          </Button>
          <Header.SearchDialog id='search-dialog'>
            <Search>
              <Search.Input aria-label='Søk' />
              <Search.Clear />
              <Search.Button type='submit' />
            </Search>
          </Header.SearchDialog>
          <Button variant='tertiary' style={{ display: 'flex', padding: '0 var(--ds-size-2)', gap: 'var(--ds-size-2)' }}>
              <Avatar aria-label='none' data-size='xs' initials='ON' style={{fontSize: 'var(--ds-size-3)'}}/>
              <span data-show-from='lg'>Ola Nordmann</span>
          </Button>
        </Header.ActionsList>
        
        <Header.MenuButton commandFor='with-buttons-and-menu'/>
        <Header.Menu id='with-buttons-and-menu' >
          <Search data-hide-from='md' >
            <Search.Input aria-label='Søk' name='search'/>
            <Search.Clear />
            <Search.Button type='submit' />
          </Search>
          <Divider data-hide-from='md' />
          <Header.ActionsList data-hide-from='md'>
            <Button 
              asChild 
              variant='secondary' 
              // @ts-expect-error We want the native 'autofocus' and Reacts onMount smartness (see https://react.dev/reference/react-dom/components/input#input)
              autofocus='true'
            >
              <a
                href='https://www.kartverket.no/'
                rel='noreferrer'
                target='_blank'
              >
                Logg inn
              </a>
            </Button>
          </Header.ActionsList>
          <Divider data-hide-from='md' />
          <Header.Nav>
              <li className='withButtonsAndMenu-header-sub-menu'>
                <Heading data-size='sm'>Temameny</Heading>
                <ul>
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
                </ul>
              </li>
              <li className='withButtonsAndMenu-header-sub-menu'>
                <Heading>Temameny</Heading>
                <ul>
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
                </ul>
              </li>
            </Header.Nav>
        </Header.Menu>
      </Header>
    </>
  )
};

export const WithSearch: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  render: (args) => (
    <>
      <Header {...args}>
        <Header.ActionsList data-show-from='md'>
          <Search style={{ width: '250px'}}>
            <Search.Input aria-label='Søk' />
            <Search.Clear />
          </Search>
        </Header.ActionsList>

        <Header.MenuButton commandFor='with-search' data-hide-from='md' />
        <Header.Menu id='with-search'>
          <Search data-hide-from='md'>
            <Search.Input aria-label='Søk' name='search'/>
            <Search.Clear />
            <Search.Button type='submit' />
          </Search>
        </Header.Menu>
      </Header>
    </>
  )
};

export const WithLanguagePicker: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '275px',
      }
    },
  },
  render: (args) => {
    const languages = ['nb', 'nn', 'en'] as const;
    type Language = (typeof languages)[number];

    const languageText: Record<Language, string> = {
      nb: 'Bokmål',
      nn: 'Nynorsk',
      en: 'English',
    };
    const [currentLang, setCurrentLang] = useState<Language>('nn');
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <Header {...args}>
        <Button
          variant='tertiary'
          popoverTarget='language-picker'
          lang='en'
          ref={buttonRef}
        >
          <LanguageIcon aria-hidden />
          Language
        </Button>
        <Dropdown id='language-picker'>
          <Dropdown.List>
            {languages.map((lang) => (
              <Dropdown.Item
                {...(currentLang === lang && { 'aria-current': true })}
              >
                <Dropdown.Button
                  lang={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    buttonRef.current?.click();
                    buttonRef.current?.focus();
                  }}
                >
                  {languageText[lang]}
                </Dropdown.Button>
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        </Dropdown>
      </Header>
    );
  }
};

export const ComplexHeader: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: 'https://eiendomsregisteret.kartverket.no/',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '420px',
      }
    },
  },
  render: (args) => {
    const languages = ['nb', 'nn', 'en'] as const;
    type Language = (typeof languages)[number];

    const languageText: Record<Language, string> = {
      nb: 'Bokmål',
      nn: 'Nynorsk',
      en: 'English',
    };
    const [currentLang, setCurrentLang] = useState<Language>('nn');
    const buttonRef = useRef<HTMLButtonElement>(null);

    return(
      <>
        <style>
          {`
          .complexHeader-header-sub-menu .ds-heading {
            margin-bottom: var(--ds-size-3);
          }
          .complexHeader-header-sub-menu ul {
            margin-bottom: var(--ds-size-3);
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
              Hjelp og støtte
            </Header.NavItem>
          </Header.Nav>
          <Header.ActionsList data-show-from='md'>
            <Button
            variant='tertiary'
            popoverTarget='language-picker'
            lang='en'
            ref={buttonRef}
          >
            <LanguageIcon aria-hidden />
            Language
          </Button>
          <Dropdown id='language-picker'>
            <Dropdown.List>
              {languages.map((lang) => (
                <Dropdown.Item
                  {...(currentLang === lang && { 'aria-current': true })}
                >
                  <Dropdown.Button
                    lang={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      buttonRef.current?.click();
                      buttonRef.current?.focus();
                    }}
                  >
                    {languageText[lang]}
                  </Dropdown.Button>
                </Dropdown.Item>
              ))}
            </Dropdown.List>
          </Dropdown>
            <Button asChild variant='secondary'>
              <a
                href='https://www.kartverket.no/'
                rel='noreferrer'
                target='_blank'
              >
                Logg inn
              </a>
            </Button>
          </Header.ActionsList>
          
          <Header.MenuButton commandFor='complex-header-menu'/>
          <Header.Menu id='complex-header-menu'>
            <Header.ActionsList data-hide-from='md'>
              <Button asChild variant='tertiary'>
                <a
                  href='https://www.kartverket.no/'
                  rel='noreferrer'
                  target='_blank'
                >
                  <LanguageIcon aria-hidden />Language
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
            </Header.ActionsList>
            <Divider data-hide-from='md' />
            <Header.Nav>
              <li className='complexHeader-header-sub-menu' data-hide-from='lg'>
                <Heading>Navlenker</Heading>
                <ul>
                  <Header.NavItem
                      href='https://www.kartverket.no/'
                      rel='noreferrer'
                      target='_blank'
                  >
                    Hjelp og støtte
                  </Header.NavItem>
                </ul>
              </li>

              <li className='complexHeader-header-sub-menu'>
                <Heading data-size='sm'>Temameny</Heading>
                <ul>
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
                </ul>
              </li>
              <li className='complexHeader-header-sub-menu'>
                <Heading>Temameny</Heading>
                <ul>
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
                </ul>
              </li>
            </Header.Nav>
          </Header.Menu>
        </Header>
      </>
    )
  }
};

// export const WithNavigationLinksAndButtons: Story = {
//   args: {
//     applicationName: 'Tjenestetittel',
//     applicationHref: 'https://eiendomsregisteret.kartverket.no/',
//   },
//   parameters: {
//     docs: {
//       story: {
//         inline: false,
//         iframeHeight: '350px',
//       }
//     },
//   },
//   render: (args) => (
//     <>
//       <style>
//         {`
//         .header-dialog-content:has(> .ds-search) {
//           max-width: 708px;
//           width: 100%;
//         }
//         `}
//       </style>
//       <Header {...args}>
//         <Header.ActionsList>
//           <Button variant='tertiary' command='show-modal' commandFor='search-dialog' data-show-from='md'>
//             <MagnifyingGlassIcon />
//             Søk
//           </Button>
//           <Header.SearchDialog id='search-dialog'>
//             <Search>
//               <Search.Input aria-label='Søk' />
//               <Search.Clear />
//               <Search.Button type='submit' />
//             </Search>
//           </Header.SearchDialog>
//           <Button variant='tertiary' style={{ display: 'flex', padding: '0 var(--ds-size-2)', gap: 'var(--ds-size-2)' }}>
//               <Avatar aria-label='none' data-size='xs' style={{fontSize: 'var(--ds-size-3)'}}/>
//               <span data-show-from='lg'>Ola Nordmann</span>
//           </Button>
//         </Header.ActionsList>
        

//         <Header.MenuButton commandFor='with-navigation-links-and-buttons'/>
//         <Header.Menu id='with-navigation-links-and-buttons' >
//           <Search data-hide-from='md' >
//             <Search.Input aria-label='Søk' name='search'/>
//             <Search.Clear />
//             <Search.Button type='submit' />
//           </Search>

//           <Divider data-hide-from='md' />

//           <Header.ActionsList data-hide-from='md'>
//             <Button 
//               asChild 
//               variant='secondary' 
//               // @ts-expect-error We want the native 'autofocus' and Reacts onMount smartness (see https://react.dev/reference/react-dom/components/input#input)
//               autofocus='true'
//             >
//               <a
//                 href='https://www.kartverket.no/'
//                 rel='noreferrer'
//                 target='_blank'
//               >
//                 Logg inn
//               </a>
//             </Button>
//           </Header.ActionsList>

//           <Divider data-hide-from='md' />

//           <Header.Nav>
//             <Header.NavItem
//                 href='https://www.kartverket.no/'
//                 rel='noreferrer'
//                 target='_blank'
//             >
//               Lenkeknapp 
//             </Header.NavItem>
//             <Header.NavItem
//                 href='https://www.kartverket.no/'
//                 rel='noreferrer'
//                 target='_blank'
//                 aria-current='page'
//             >
//               Lenkeknapp 
//             </Header.NavItem>
//           </Header.Nav>
//         </Header.Menu>
//       </Header>
//     </>
//   )
// };
