import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { List } from '../list/List';

const meta = {
  component: Divider,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (_args) => (
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
  render: (_args) => (
    <div>
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
  )
};
