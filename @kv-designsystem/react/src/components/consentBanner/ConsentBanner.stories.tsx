import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Link } from '../link/Link';
import { Button } from '../button/Button';
import { Fieldset } from '../fieldset/Fieldset';
import { Checkbox } from '../checkbox/Checkbox';
import { ConsentBanner } from './ConsentBanner';

const meta = {
  component: ConsentBanner,
} satisfies Meta<typeof ConsentBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => (
    <ConsentBanner {...args}>
      <Heading id='samtykkebanner-tittel' data-size='sm'>
        Får vi samle informasjon om hvordan nettsiden brukes?
      </Heading>
      <Paragraph>
        Hvis du svarer ja, lagrer og analyserer vi informasjon som hjelper oss å forbedre nettsiden.
        På{' '}
        <Link href='#' style={{ color: 'inherit' }}>
          Erklæring om informasjonskapsler
        </Link>
        {' '}kan du endre valg og lese mer om hva vi lagrer og hvorfor. Denne finner du alltid
        nederst på siden
      </Paragraph>
      <form
        method='post'
        action='/api/consent'
        style={{
          display: 'flex',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Button name='action' type='submit'>
          Ja
        </Button>
        <Button name='action' type='submit'>
          Nei
        </Button>
      </form>
      <Paragraph data-size='sm'>
        Vi lagrer også nødvendig informasjon som ikke kan velges bort. Dette gjør at nettsiden
        fungerer og er trygg.
      </Paragraph>
    </ConsentBanner>
  )
};

export const MultipleOptions: Story = {
  render: (_args) => (
    <ConsentBanner>
      <form method='post' action='/api/consent'>
        <Fieldset>
          <Fieldset.Legend>
            <Heading
              id='samtykkebanner-tittel'
              data-size='sm'
              style={{ marginBottom: 'var(--ds-size-2)' }}
            >
              Hva får vi samle informasjon om?
            </Heading>
          </Fieldset.Legend>
          <Fieldset.Description>
            Informasjonen hjelper oss å forbedre nettsiden og løse problemer raskere. Du kan når som
            helst endre valget ditt nederst på siden. På{' '}
            <Link href='#' >
              Erklæring om informasjonskapsler
            </Link>
            {' '}kan du endre valg og lese mer om hva vi lagrer og hvorfor. Denne finner du alltid
            nederst på siden
          </Fieldset.Description>
          <Checkbox
            label='Hvordan du bruker nettsiden'
            name='consent'
            value='usage'
          />
          <Checkbox
            label='Tekniske feil som oppstår'
            name='consent'
            value='technical-errors'
          />
        </Fieldset>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-size-4)',
            marginTop: 'var(--ds-size-5)',
          }}
        >
          <Button name='action' type='submit' value='save'>
            Lagre valg
          </Button>
          <Button name='action' type='submit' value='approve-all'>
            Godta alle
          </Button>
          <Button name='action' type='submit' value='decline-all'>
            Avslå alle
          </Button>
        </div>
      </form>
      <Paragraph data-size='sm'>
        Vi lagrer også nødvendig informasjon som ikke kan velges bort. Dette gjør at nettsiden
        fungerer og er trygg.
      </Paragraph>
    </ConsentBanner>
  )
};
