import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Link } from '../link/Link';
import { Button } from '../button/Button';
import { Fieldset } from '../fieldset/Fieldset';
import { Checkbox } from '../checkbox/Checkbox';
import { ConsentBanner } from './ConsentBanner';
// import { InformationSquareFillIcon, XMarkIcon } from '@navikt/aksel-icons';
// import { Alert } from '@digdir/designsystemet-react';

const meta = {
  component: ConsentBanner,
} satisfies Meta<typeof ConsentBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (_args) => (
    <ConsentBanner>
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

// Skal dette bare være en alert? Skal det være et ConsentBanner? Hvor skal id plasseres? Ikke tydelig fra digdir. :(
// export const OnlyNecessary: Story = {
//   render: (_args) => (
// <Alert data-color='info' style={{ '--dsc-alert-icon-size': '0px' } as React.CSSProperties} >
//   <div
//     style={{
//       maxWidth: 'var(--kvds-frame-content-max-width',
//       paddingInline: 'var(--kvds-layout-padding-inline)',
//       marginInline: 'auto',
//       display: 'flex',
//       alignItems: 'center',
//     }}
//   >
//     <InformationSquareFillIcon
//       style={{
//         flexShrink: '0',
//         fontSize: '24px',
//         marginRight: 'var(--ds-size-4)'
//       }}
//     />
//     <Paragraph>

//     <Link href='#'>
//       Vi lagrer nødvendige informasjonskapsler
//     </Link>
//     {' '} som gjør at nettsiden fungerer og er trygg.
//     </Paragraph>
//     <Button icon variant='tertiary' style={{ marginLeft: 'auto' }}>
//       <XMarkIcon style={{ fontSize: 'var(--ds-size-6)' }} />
//     </Button>

//   </div>
// </Alert >
// <ConsentBanner>
//   <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-size-4)' }}>
//     <InformationSquareFillIcon style={{ fontSize: 'var(--ds-size-6)'}} />
//     <Paragraph id='samtykkebanner-tittel'>
//       <Link href='#' style={{ color: 'inherit' }}>
//         Vi lagrer nødvendige informasjonskapsler
//       </Link>
//       {' '} som gjør at nettsiden fungerer og er trygg.
//     </Paragraph>
//   <Button icon variant='tertiary' style={{ justifySelf: 'end', minWidth: 'fit-content' }}>
//     <XMarkIcon style={{ fontSize: 'var(--ds-size-6)'}} />
//   </Button>
//   </span>

// </ConsentBanner>
//   )
// };
