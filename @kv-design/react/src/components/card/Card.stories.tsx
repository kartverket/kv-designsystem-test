import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Button } from '../button/Button';

const meta = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'grid',
          gap: 'var(--ds-size-4)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px , 320px))',
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
  render: (args) => (
    <Card style={{ maxWidth: '320px' }} data-color='accent'>
      <Heading>Tittel</Heading>
      <Paragraph>Innhold</Paragraph>
      <Paragraph data-size='sm'>Fotnote</Paragraph>
    </Card>
  ),
};

export const Media: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => (
    <>
      <Card {...args} style={{ maxWidth: '320px' }} >
        <Card.Block>
          {/* <img
            src={schoolSuppliesImg}
            alt='Fotografi av forskjellig skoleutstyr'
          /> */}
          <Paragraph>
            *Bilde*
          </Paragraph>
        </Card.Block>
        <Card.Block>
          <Heading>Geodesi</Heading>
          <Paragraph>
            Geodesi er faget som måler og beskriver jordens form, bevegelse og tyngdefelt. Kunnskapen brukes for å plassere alt annet riktig på kart.
          </Paragraph>
        </Card.Block>
      </Card>
    </>
  )
}

export const WithLink: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => (
    <>
      <Card data-color='accent' {...args}>
        <Card.Block>
          {/* <img src={studentsImg} alt='' /> */}
          *Bilde*
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
  )
}

export const AsButton: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => (
    <Card asChild data-color='accent'>
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
  )
}

export const Horizontal: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => (
    <Card
      data-color='accent'
      style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',
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
  )
}
