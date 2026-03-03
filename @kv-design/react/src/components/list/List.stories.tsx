import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';
import { Heading } from '../typography/heading/Heading';
import { Link } from '../link/Link';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta = {
  component: List.Item,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof List.Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <List.Unordered>
      <List.Item>Bøyabreen</List.Item>
      <List.Item>Briksdalsbreen</List.Item>
      <List.Item>Nigardsbreen</List.Item>
    </List.Unordered>
  ),
};

export const Unordered: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size='xs'
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        For å få tilgang til datasettet, må du gjøre følgende:
      </Heading>
      <List.Unordered>
        <List.Item>Registrere en bruker i Geonorge-portalen.</List.Item>
        <List.Item>Godta vilkårene for bruk av åpne data.</List.Item>
        <List.Item>Laste ned datasettet i ønsket format.</List.Item>
      </List.Unordered>
    </>
  ),
};

export const Ordered: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size='xs'
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Slik gjør du:
      </Heading>
      <List.Ordered>
        <List.Item>
          Tørk over kyllingfiletene før du krydrer og steker
        </List.Item>
        <List.Item>Ha salt og pepper på filetene</List.Item>
        <List.Item>
          Stek filetene på sterk varme i to minutter på hver side
        </List.Item>
      </List.Ordered>
    </>
  ),
};

export const Indented: Story = {
  args: {
    style: { marginTop: 'var(--ds-size-2)' },
  },
  render: (...args) => (
    <>
      <Heading level={2} data-size="xs">
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

// TODO: swap with Kartverket-links
const designLinks = [
  {
    href: 'https://www.udir.no/om-udir/designprofil/identitet/',
    text: 'Identitet',
  },
  {
    href: 'https://www.udir.no/om-udir/designprofil/farger/',
    text: 'Farger',
  },
  {
    href: 'https://www.udir.no/om-udir/designprofil/typografi/',
    text: 'Typografi',
  },
];

export const WithLinks: Story = {
  args: {
    style: { listStyle: 'none', padding: 0 },
  },
  render: (...args) => (
    <List.Unordered {...args}>
      {designLinks.map((link) => (
        <List.Item key={link.href}>
          <Link href={link.href} target="_blank">
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
      <List.Unordered>
        <List.Item>Registrere en bruker i Geonorge-portalen.</List.Item>
        <List.Item>Godta vilkårene for bruk av åpne data.</List.Item>
        <List.Item>Laste ned datasettet i ønsket format.</List.Item>
      </List.Unordered>
    </>
  )
}


