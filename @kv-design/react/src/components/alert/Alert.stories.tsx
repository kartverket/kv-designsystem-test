import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Heading } from '../heading/Heading';
import { Link } from '../link/Link';

const meta = {
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    // children: 'En beskjed det er viktig at brukeren ser',
  },
  render: (args) => (
    <Alert {...args}>
      <Heading 
        level={2}
        data-size='xs'
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Overskrift
      </Heading>
      En beskjed det er viktig at brukeren ser
    </Alert>
  )
};

export const VariantInfo: Story = {
  args: {
    'data-color': 'info',
  },
  render: (args) => (
    <Alert {...args}>
      <Heading 
        level={2}
        data-size='xs'
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Nye høydedata er tilgjengelige
      </Heading>
      Vi har oppdatert datasettet for ditt område. Last inn kartet på nytt for å se endringene.
    </Alert>
  )
};

export const VariantSuccess: Story = {
  args: {
    'data-color': 'success',
  },
  render: (args) => (
    <Alert {...args}>
      <Heading 
        level={2}
        data-size='xs'
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Endringen ble lagret
      </Heading>
      Vi har oppdatert innstillingene dine, og kartvisningen bruker nå de nye valgene.
    </Alert>
  )
};

export const VariantWarning: Story = {
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>
      <Heading 
        level={2}
        data-size='xs'
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Mangler tilknytning til kommunen
      </Heading>
      Vi finner ikke kommuneinformasjon for eiendommen. Sjekk matrikkelnummeret og prøv igjen.
    </Alert>
  )
};

export const VariantDanger: Story = {
  args: {
    'data-color': 'danger',
  },
  render: (args) => (
    <Alert {...args}>
      <Heading 
        level={2}
        data-size='xs'
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Kan ikke hente kartlag
      </Heading>
      Vi klarte ikke å laste kartlaget. Prøv å laste inn siden på nytt. {' '}
      <Link href='https://www.kartverket.no/om-kartverket/kontakt-oss'>Kontakt oss</Link>
      {' '} hvis problemet fortsetter.
    </Alert>
  )
};

export const NoHeading: Story = {
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>Du har 7 dager igjen på å fullføre søknaden.</Alert>
  )
};

//TODO: swap to a more relevant example and fix link
export const WithLink: Story = {
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>
      <Heading 
        level={2}
        data-size='xs'
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Oppdatering kreves
      </Heading>
      Fristen for å bytte til ny API-nøkkel er om 3 dager. {' '} 
      <Link href='https://www.kartverket.no'>Oppdater nå</Link>
    </Alert>
  )
};

//TODO: Add version for WrongLiveRegion and CorrectLiveRegion