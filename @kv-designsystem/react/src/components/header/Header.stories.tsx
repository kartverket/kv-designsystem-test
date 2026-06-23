import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Divider } from '../divider/Divider';
import { Dropdown } from '../dropdown/Dropdown';
import { Header } from './';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { List } from '../list/List';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Search } from '../search/Search';
import { EnterIcon, LanguageIcon } from '@navikt/aksel-icons';

const meta = {
  component: Header
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: '#',
  },
  render: (args) => (
    <Header {...args} />
  ),
};

export const WithNavigationLinks: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: '#',
  },
  parameters: {
    docs: {
      story: {
        inline: false, // Render story in an iframe to ensure vw units are based on the preview viewport.
        iframeHeight: '250px',
      }
    },
  },
  render: (args) => (
    <Header {...args}>
      <Header.Nav data-show-from='md'>
        <Header.NavItem href='#' aria-current='page'>
          Lenkeknapp
        </Header.NavItem>
        <Header.NavItem href='#'>
          Lenkeknapp
        </Header.NavItem>
      </Header.Nav>

      <Header.MenuButton data-hide-from='md' commandFor='with-navigation-links' />
      <Header.Menu data-hide-from='md' id='with-navigation-links'>
        <Header.Nav>
          <Header.NavItem href='#' aria-current='page'>
            Lenkeknapp
          </Header.NavItem>
          <Header.NavItem href='https://www.kartverket.no/'>
            Lenkeknapp
          </Header.NavItem>
        </Header.Nav>
      </Header.Menu>
    </Header>
  ),
};

export const WithMenu: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: '#',
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
          /* Styles defined in application-specific css */
          .withMenu-header-sub-menu .ds-heading {
            margin-bottom: var(--ds-size-3);
          }
          .withMenu-header-sub-menu ul {
            margin-bottom: var(--ds-size-3);
          }
        `}
      </style>
      <Header {...args}>
        <Header.MenuButton commandFor='with-menu' />
        <Header.Menu id='with-menu'>
          <Header.Nav>
            <li className='withMenu-header-sub-menu'>
              <Heading data-size='sm'>Temameny</Heading>
              <ul>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#' aria-current='page'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
              </ul>
            </li>
            <li className='withMenu-header-sub-menu'>
              <Heading>Temameny</Heading>
              <ul>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
              </ul>
            </li>
          </Header.Nav>
        </Header.Menu>
      </Header>
    </>
  ),
};

export const WithButtonsAndMenu: Story = {
  args: {
    applicationName: 'Eiendoms\u00ADregisteret',
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
          /* Styles defined in application-specific css */
          .withButtonsAndMenu-header-sub-menu .ds-heading {
            margin-bottom: var(--ds-size-3);
          }

          .withButtonsAndMenu-small-initials:before {
            font-size: var(--ds-size-4);
          }
        `}
      </style>
      <Header {...args}>
        <Header.ActionsList>
          <Header.SearchButton commandFor='with-buttons-and-menu-search' data-show-from='md' />
          <Header.SearchDialog id='with-buttons-and-menu-search'>
            <Search style={{ maxWidth: '708px', justifySelf: 'center' }}>
              <Search.Input aria-label='Søk' />
              <Search.Clear />
              <Search.Button type='submit' />
            </Search>
          </Header.SearchDialog>
          <Button variant='tertiary' style={{ display: 'flex', padding: '0 var(--ds-size-2)', gap: 'var(--ds-size-2)' }}>
            <Avatar className='withButtonsAndMenu-small-initials' aria-label='none' data-size='xs' initials='ON' />
            <span data-show-from='lg'>Ola Nordmann</span>
          </Button>
        </Header.ActionsList>

        <Header.MenuButton commandFor='with-buttons-and-menu' />
        <Header.Menu id='with-buttons-and-menu' >
          <Search data-hide-from='md' >
            <Search.Input aria-label='Søk' name='search' />
            <Search.Clear />
            <Search.Button type='submit' />
          </Search>

          <Divider data-hide-from='md' />

          <Header.Nav>
            <li className='withButtonsAndMenu-header-sub-menu'>
              <Heading data-size='sm'>Eiendom</Heading>
              <ul>
                <Header.NavItem
                  href='#'
                  // @ts-expect-error We want the native 'autofocus' and Reacts onMount smartness (see https://react.dev/reference/react-dom/components/input#input)
                  autofocus='true'
                >
                  Alt om eiendom
                </Header.NavItem>
                <Header.NavItem href='#' aria-current='page'>
                  Tinglyse Eierskifte
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Spørsmål om tinglysning
                </Header.NavItem>
              </ul>
            </li>
            <li className='withButtonsAndMenu-header-sub-menu'>
              <Heading>Til lands</Heading>
              <ul>
                <Header.NavItem href='#'>
                  Alt om til lands
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Rett i kartet
                  Flyfoto
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Rett i kartet
                </Header.NavItem>
              </ul>
            </li>
            <li className='withButtonsAndMenu-header-sub-menu'>
              <Heading>Geodataarbeid</Heading>
              <ul>
                <Header.NavItem href='#'>
                  Alt om geodataarbeid
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Forvaltning, drift og vedlikehold
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Planarbeid
                </Header.NavItem>
              </ul>
            </li>
          </Header.Nav>
        </Header.Menu>
      </Header>
    </>
  ),
};

export const WithSearch: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: '#',
  },
  render: (args) => (
    <>
      <Header {...args}>
        <Header.ActionsList data-show-from='md'>
          <Search style={{ width: '250px' }}>
            <Search.Input aria-label='Søk' />
            <Search.Clear />
          </Search>
        </Header.ActionsList>

        <Header.MenuButton commandFor='with-search' data-hide-from='md' />
        <Header.Menu id='with-search'>
          <Search data-hide-from='md'>
            <Search.Input aria-label='Søk' name='search' />
            <Search.Clear />
            <Search.Button type='submit' />
          </Search>
        </Header.Menu>
      </Header>
    </>
  ),
};

export const WithLanguagePicker: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: '#',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '225px',
      }
    },
  },
  render: (args) => {
    const languages = ['no', 'en'] as const;
    type Language = (typeof languages)[number];

    const languageText: Record<Language, string> = {
      no: 'Norsk',
      en: 'English',
    };
    const [currentLang, setCurrentLang] = useState<Language>('no');
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
          <span data-show-from='sm'>Language</span>
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
  },
};

export const WithScroll: Story = {
  args: {
    applicationName: 'Tjenestetittel',
    applicationHref: '#',
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
        /* Styles defined in application-specific css */
          .withScroll-header-sub-menu .ds-heading {
            margin-bottom: var(--ds-size-3);
          }
          .withScroll-header-sub-menu ul {
            margin-bottom: var(--ds-size-3);
          }
        `}
      </style>
      <Header {...args}>
        <Header.MenuButton commandFor='with-scroll' />
        <Header.Menu id='with-scroll'>
          <Header.Nav>
            <li className='withScroll-header-sub-menu'>
              <Heading data-size='sm'>Temameny</Heading>
              <ul>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#' aria-current='page'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
              </ul>
            </li>
            <li className='withScroll-header-sub-menu'>
              <Heading>Temameny</Heading>
              <ul>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
                <Header.NavItem href='#'>
                  Lenkeknapp
                </Header.NavItem>
              </ul>
            </li>
          </Header.Nav>
        </Header.Menu>
      </Header>

      <main style={{ maxWidth: '1296px', margin: '0 auto', }}>
        <div
          style={{
            maxWidth: '70ch',
            justifyContent: 'left',
            padding: 'var(--ds-size-18) clamp(var(--kvds-layout-padding-inline), 10vw, calc(var(--ds-size-15) * 2))',
          }}>
          <Heading
            data-size='md'
            level={1}
            style={{
              marginBottom: 'var(--ds-size-2)'
            }}
          >
            Tinglysing av eiendom
          </Heading>
          <Paragraph>
            Å tinglyse en eiendom sikrer rettighetene dine og gjør informasjonen tilgjengelig i
            grunnboken. Når du tinglyser, blir opplysningene offentlige og kan brukes av både
            myndigheter og private aktører. Dette bidrar til oversiktlige og trygge
            eiendomstransaksjoner.
          </Paragraph>
          <br />
          <Paragraph>
            Tinglysingen følger reglene i tinglysingsloven og tilhørende forskrifter. Disse danner
            rammen for hvordan vi behandler dokumentene dine, og sikrer at rettighetene blir registrert
            på en korrekt og pålitelig måte.
          </Paragraph>
          <Divider
            style={{
              margin: 'var(--ds-size-4) 0'
            }}
          />
          <Heading
            level={2}
            style={{
              marginBottom: 'var(--ds-size-2)'
            }}
          >
            Se også
          </Heading>
          <List.Unordered
            style={{
              listStyle: 'none',
              padding: 0
            }}
          >
            <List.Item>
              <Link href=''>
                Slik følger du saken din i grunnboken
              </Link>
            </List.Item>
            <List.Item>
              <Link href=''>
                Slik retter du feil i et tinglyst dokument
              </Link>
            </List.Item>
            <List.Item>
              <Link href=''>
                Veiledning for eiendomsmegler og profesjonelle aktører
              </Link>
            </List.Item>
          </List.Unordered>
        </div>
      </main>

    </>
  ),
};

export const ComplexHeader: Story = {
  args: {
    applicationName: 'Tjeneste\u00ADtittel',
    applicationHref: '#',
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
    const languages = ['no', 'en'] as const;
    type Language = (typeof languages)[number];

    const languageText: Record<Language, string> = {
      no: 'Norsk',
      en: 'English',
    };
    const [currentLang, setCurrentLang] = useState<Language>('no');
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <style>
          {`
            /* Styles defined in application-specific css */
            .complexHeader-header-sub-menu .ds-heading {
              margin-bottom: var(--ds-size-3);
            }

            .complexHeader-header-sub-menu ul {
              margin-bottom: var(--ds-size-3);
            }

            [popovertarget='language-picker'] {
                @container header-container (width <= 768px) {
                  padding-inline: var(--ds-size-1);
                }
            }
          `}
        </style>
        <Header {...args}>
          <Header.Nav data-show-from='lg'>
            <Header.NavItem href='#'>
              Hjelp og støtte
            </Header.NavItem>
          </Header.Nav>
          <Header.ActionsList>
            <Button
              variant='tertiary'
              popoverTarget='language-picker'
              lang='en'
              ref={buttonRef}
            >
              <LanguageIcon aria-hidden />
              <span data-show-from='md'>Language</span>
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
            <Button asChild variant='secondary' data-show-from='md'>
              <a href='#'>
                <EnterIcon aria-hidden />
                Logg inn
              </a>
            </Button>
          </Header.ActionsList>

          <Header.MenuButton commandFor='complex-header-menu' />
          <Header.Menu id='complex-header-menu'>
            <Header.ActionsList data-hide-from='md'>
              <Button asChild variant='secondary'>
                <a href='#'>
                  <EnterIcon aria-hidden />
                  Logg inn
                </a>
              </Button>
            </Header.ActionsList>
            <Divider data-hide-from='md' />
            <Header.Nav>
              <li className='complexHeader-header-sub-menu' data-hide-from='lg'>
                <Heading>Navlenker</Heading>
                <ul>
                  <Header.NavItem href='#'>
                    Hjelp og støtte
                  </Header.NavItem>
                </ul>
              </li>

              <li className='complexHeader-header-sub-menu'>
                <Heading data-size='sm'>Temameny</Heading>
                <ul>
                  <Header.NavItem href='#'>
                    Lenkeknapp
                  </Header.NavItem>
                  <Header.NavItem href='#' aria-current='page'>
                    Lenkeknapp
                  </Header.NavItem>
                  <Header.NavItem href='#'>
                    Lenkeknapp
                  </Header.NavItem>
                </ul>
              </li>
              <li className='complexHeader-header-sub-menu'>
                <Heading>Temameny</Heading>
                <ul>
                  <Header.NavItem href='#'>
                    Lenkeknapp
                  </Header.NavItem>
                  <Header.NavItem href='#'>
                    Lenkeknapp
                  </Header.NavItem>
                  <Header.NavItem href='#'>
                    Lenkeknapp
                  </Header.NavItem>
                </ul>
              </li>
            </Header.Nav>
          </Header.Menu>
        </Header>
      </>
    )
  },
};
