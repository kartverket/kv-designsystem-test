import { Footer, Header, Heading, Link } from '@kv-designsystem/react';
import { MyCard } from './MyCard';

function App() {
  return (
    <div className="layout">
      <Header applicationHref="#" applicationName="Tjenestetittel" />

      <div className="content">
        <MyCard />
      </div>

      <Footer>
        <Footer.List>
          <Footer.Item>
            <Heading data-size="2xs">Kontakt oss</Heading>
          </Footer.Item>
          <Footer.Item>
            <span>Telefon:</span>
            <Link aria-label="Ring Kartverket på telefon" href="tel:32118000">
              32 11 80 00
            </Link>
          </Footer.Item>
          <Footer.Item>
            <span>E-post:{'  '}</span>
            <Link aria-label="Send e-post til Kartverket" href="mailto:post@kartverket.no">
              post@kartverket.no
            </Link>
          </Footer.Item>
          <Footer.Item>
            <Link href="https://www.kartverket.no/om-kartverket/kontakt-oss">
              Kontaktinfo og adresser
            </Link>
          </Footer.Item>
        </Footer.List>
        <Footer.List>
          <Footer.Item>
            <Heading data-size="2xs">Om nettstedet</Heading>
          </Footer.Item>
          <Footer.Item>
            <Link href="https://www.kartverket.no/om-kartverket/personvern">
              Personvernerklæring
            </Link>
          </Footer.Item>
          <Footer.Item>
            <Link href="https://eiendomsregisteret.kartverket.no/cookies">
              Erklæring om informasjonskapsler
            </Link>
          </Footer.Item>
          <Footer.Item>
            <Link href="#">Endre valg for informasjon vi kan lagre</Link>
          </Footer.Item>
          <Footer.Item>
            <Link href="https://uustatus.no/nb/erklaringer/publisert/b26daa41-074f-4153-88e6-8414c7732e03">
              Tilgjengelighetserklæring (uustatus.no)
            </Link>
          </Footer.Item>
        </Footer.List>
      </Footer>
    </div>
  );
}

export default App;
