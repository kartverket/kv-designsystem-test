import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';

const meta = {
  component: Footer
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (_args) => (
    <Footer>
      <Footer.List>
        <Footer.Item>
          <Heading data-size='2xs'>
            Kontakt oss
          </Heading>
        </Footer.Item>
        <Footer.Item>
          <span>Telefon:</span>
          <Link href='tel:32118000' aria-label='Ring Kartverket på telefon'>
            32 11 80 00
          </Link>
        </Footer.Item>
        <Footer.Item>
            <span>E-post: {' '}</span>
            <Link href='mailto:post@kartverket.no' aria-label='Send e-post til Kartverket'>
              post@kartverket.no
            </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://www.kartverket.no/om-kartverket/kontakt-oss'>
            Kontaktinfo og adresser
          </Link>
        </Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item >
          <Heading data-size='2xs'>
            Om nettstedet
          </Heading>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://www.kartverket.no/om-kartverket/personvern'>
            Personvernerklæring
          </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://eiendomsregisteret.kartverket.no/cookies'>
            Erklæring om informasjonskapsler
          </Link>
        </Footer.Item>
                <Footer.Item>
          <Link href='#'>
            Endre valg for informasjon vi kan lagre
          </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://uustatus.no/nb/erklaringer/publisert/b26daa41-074f-4153-88e6-8414c7732e03'>
            Tilgjengelighetserklæring (uustatus.no)
          </Link>
          </Footer.Item>
      </Footer.List>
    </Footer>
  )
};

export const WithThreeColumns: Story = {
  render: (_args) => (
    <Footer>
      <Footer.List>
        <Footer.Item>
          <Heading data-size='2xs'>
            Kontakt oss
          </Heading>
        </Footer.Item>
        <Footer.Item>
          <span>Telefon:</span>
          <Link href='tel:32118000' aria-label='Ring Kartverket på telefon'>
            32 11 80 00
          </Link>
        </Footer.Item>
        <Footer.Item>
            <span>E-post: {' '}</span>
            <Link href='mailto:post@kartverket.no' aria-label='Send e-post til Kartverket'>
              post@kartverket.no
            </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://www.kartverket.no/om-kartverket/kontakt-oss'>
            Kontaktinfo og adresser
          </Link>
        </Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item >
          <Heading data-size='2xs'>
            Om nettstedet
          </Heading>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://www.kartverket.no/om-kartverket/personvern'>
            Personvernerklæring
          </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://eiendomsregisteret.kartverket.no/cookies'>
            Erklæring om informasjonskapsler
          </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='#'>
            Endre valg for informasjon vi kan lagre
          </Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='https://uustatus.no/nb/erklaringer/publisert/b26daa41-074f-4153-88e6-8414c7732e03'>
            Tilgjengelighetserklæring (uustatus.no)
          </Link>
          </Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item >
          <Heading data-size='2xs'>
            Hjelp
          </Heading>
        </Footer.Item>
        <Footer.Item>
          <Link href='#'>Driftsmeldinger</Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='#'>Ofte stilte spørsmål</Link>
        </Footer.Item>
        <Footer.Item>
          <Link href='#'>Skjemaer</Link>
          </Footer.Item>
      </Footer.List>
    </Footer>
  )
};
