import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta = {
  component: Card,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          alignItems: 'center',
          display: 'grid',
          gap: 'var(--ds-size-4)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px , 1fr))',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: [],
  },
  render: () => (
    <Card style={{ maxWidth: '320px' }} data-color='accent'>
      <Heading>Tittel</Heading>
      <Paragraph>Innhold</Paragraph>
      <Paragraph data-size='sm'>Fotnote</Paragraph>
    </Card>
  ),
};

const geodesyImg = 'https://images.unsplash.com/photo-1732362129903-abc909ab1067?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Media: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => (
    <>
      <Card {...args} style={{ maxWidth: '320px' }} >
        <Card.Block>
          <img
            src={geodesyImg}
            alt='Historisk fotografi av landmåling'
          />
        </Card.Block>
        <Card.Block>
          <Heading>Geodesi</Heading>
          <Paragraph>
            Geodesi er faget som måler og beskriver jordens form, bevegelse og tyngdefelt. Kunnskapen brukes for å plassere alt annet riktig på kart.
          </Paragraph>
        </Card.Block>
      </Card>
    </>
  ),
};

const houseImg = 'https://images.unsplash.com/photo-1730184474747-f0b85ebc5f94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const houseImg = 'https://images.unsplash.com/photo-1730184474747-f0b85ebc5f94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const WithLink: Story = {
  args: {
    ...Preview.args,
  },
  render: () => (
    <>
      <Card style={{ maxWidth: '320px' }}>
        <Card.Block>
          <img 
            src={houseImg} 
            alt='Bilde av 3D printet hus' 
          />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a
              href='https://kartverket.no/eiendom/mine-eiendommer/innsyn-i-egne-eiendomsopplysninger'
              target='_blank'
              rel='noopener noreferrer'
            >
              Innsyn i egne eiendomsopplysninger
            </a>
          </Heading>
          <Paragraph>
            Du kan se og registrere opplysninger om dine eiendommer på Kartverkets nettsider.
          </Paragraph>
        </Card.Block>
      </Card>
    </>
  ),
};

export const AsButton: Story = {
  args: {
    ...Preview.args,
  },
  render: () => (
    <Card asChild style={{ maxWidth: '320px' }}>
      <button type='button'>
        <Card.Block>
          <Heading>Innstillinger og personvern</Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>
            Dette åpner en dialog der du kan oppdatere personvernvalg, justere
            innstillinger og tilpasse hvordan tjenesten behandler informasjonen
            din. Du kan se gjennom endringene før du lagrer.
          </Paragraph>
        </Card.Block>
      </button>
    </Card>
  ),
};

export const Horizontal: Story = {
  args: {
    ...Preview.args,
  },
  render: () => (
    <Card
      style={{ 
        display: 'grid', 
        gridAutoFlow: 'column',
        width: '700px',
      }}
    >
      <Card.Block>
        <Heading>
          <a
              href='https://kartverket.no/til-lands/posisjon/brukerveiledning-posisjonstjenester'
              target='_blank'
              rel='noopener noreferrer'
            >
              Les Kartverkets brukerveiledning for posisjonstjenester
            </a>
        </Heading>
      </Card.Block>
      <Card.Block>
        <Paragraph>
          Få en oversikt over oppsett av utstyr og spesielle forhold som gjelder
          ved måling av CPOS og DPOS i denne brukerveiledningen for Kartverkets posisjonstjenester.
        </Paragraph>
      </Card.Block>
    </Card>
  ),
};
