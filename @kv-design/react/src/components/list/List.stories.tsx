import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { List } from './List';

const meta = {
  component: List.Unordered,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof List.Unordered>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <List.Unordered>
      <List.Item>Den norske los</List.Item>
      <List.Item>Historiske stedsnavn</List.Item>
      <List.Item>Norgeskart</List.Item>
    </List.Unordered>
  )
};

export const Unordered: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size='xs'
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Kort fortalt om Eiendomsregisteret:
      </Heading>
      <List.Unordered>
        <List.Item>
          Eiendomsregisteret samler opplysninger fra flere kilder, inkludert data som kommunen har 
          registrert.
        </List.Item>
        <List.Item>
          Opplysningene du registrerer, erstatter ikke kommunens eksisterende data, men kan brukes 
          som grunnlag for oppdatering.
        </List.Item>
        <List.Item>
          Tjenesten er frivillig, og bare én eier per bolig eller fritidsbolig trenger å gjennomføre registreringen.
        </List.Item>
      </List.Unordered>
    </>
  )
};

export const Ordered: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size='xs'
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Hva skal du gjøre?
      </Heading>
      <List.Ordered>
        <List.Item>
          Logg inn og sjekk opplysningene
        </List.Item>
        <List.Item>
          Registrer det du mener er riktig
        </List.Item>
        <List.Item>
          Kom tilbake om noe endrer seg
        </List.Item>
      </List.Ordered>
    </>
  )
};

// Since we need to pass args to List.Ordered but the component type of the meta object is List.Unordered, we need to explicitly set the component type of the Story to List.Ordered
export const Indented: StoryObj<React.ComponentProps<typeof List.Ordered>> = {
  args: {
    style: { marginTop: 'var(--ds-size-2)' },
  },
  render: (args) => (
    <>
      <Heading level={2} data-size='xs'>
        Innhold
      </Heading>
      <List.Ordered {...args}>
        <List.Item>
          Barnehagens verdigrunnlag
          <List.Unordered>
            <List.Item>Barn og barndom</List.Item>
            <List.Item>Demokrati</List.Item>
            <List.Item>Mangfold og gjensidig respekt</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          Ansvar og roller
          <List.Unordered>
            <List.Item>Barnehageeier</List.Item>
            <List.Item>Styrer</List.Item>
            <List.Item>Pedagogisk leder</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          Barnehagens formål og innhold
          <List.Unordered>
            <List.Item>
              Barnehagen skal ivareta barnas behov for omsorg
            </List.Item>
            <List.Item>Barnehagen skal ivareta barnas behov for lek</List.Item>
          </List.Unordered>
        </List.Item>
      </List.Ordered>
    </>
  ),
};

const designLinks = [
  {
    href: 'https://www.kartverket.no/til-sjos/nautiske-publikasjoner/den-norske-los',
    text: 'Den norske los',
  },
  {
    href: 'https://www.kartverket.no/til-lands/stadnamn/finn-stadnamn-i-kart-og-sentralt-stadnamnregister',
    text: 'Historiske stedsnavn',
  },
  {
    href: 'https://www.norgeskart.no/',
    text: 'Norgeskart',
  },
];

export const WithLinks: Story = {
  args: {
    style: { listStyle: 'none', padding: 0 },
  },
  render: (args) => (
    <List.Unordered {...args}>
      {designLinks.map((link) => (
        <List.Item key={link.href}>
          <Link href={link.href} target='_blank'>
            {link.text}
          </Link>
        </List.Item>
      ))}
    </List.Unordered>
  ),
};

export const ContinueSentence: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size='xs'
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Filene skal leveres
      </Heading>
      <List.Unordered>
        <List.Item>i SOSI-format</List.Item>
        <List.Item>med korrekt koordinatsystem</List.Item>
        <List.Item>med oppdatert metadata</List.Item>
      </List.Unordered>
    </>
  )
};

export const NewSentence: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size='xs'
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        For å få tilgang til datasettet, må du gjøre følgende:
      </Heading>
      <List.Ordered>
        <List.Item>Registrer en bruker i Geonorge-portalen.</List.Item>
        <List.Item>Godta vilkårene for bruk av åpne data.</List.Item>
        <List.Item>Last ned datasettet i ønsket format.</List.Item>
      </List.Ordered>
    </>
  )
};
