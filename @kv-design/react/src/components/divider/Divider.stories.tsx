import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { ListItem, ListUnordered } from '@digdir/designsystemet-react';

const meta = {
  component: Divider,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <div style={{textAlign: 'center'}}>
      <Paragraph >
        Divider er brukt for å dele opp innhold i mindre deler.
      </Paragraph>
      <Divider />
      <Paragraph>
        Den kan også brukes for å skille innhold som er relatert til hverandre.
      </Paragraph>
    </div>
  )
};

// TODO: add links
export const InText: Story = {
  render: () => (
    <>
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
        <br />
        <br />
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
      <ListUnordered
        style={{
          listStyle: 'none',
          padding: 0
        }}
      >
      <ListItem>
        <Link href=''>
          Slik følger du saken din i grunnboken
        </Link>
      </ListItem>
      <ListItem>
        <Link href=''>
          Slik retter du feil i et tinglyst dokument
        </Link>
      </ListItem>
      <ListItem>
        <Link href=''>
          Veiledning for eiendomsmegler og profesjonelle aktører
        </Link>
      </ListItem>
      </ListUnordered>
    </>
  )
};
