import type { Meta, StoryObj } from '@storybook/react-vite';
import { Details } from './Details';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';

const meta = {
  component: Details,
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <Details>
      <Details.Summary>
        Hvorfor må Kartverket behandle bestillingen min?
      </Details.Summary>
      <Details.Content>
        Når du bestiller et eiendomsdokument mottar du en attestert eller bekreftet 
        utskrift. Ved bestilling av attestert dokument må Kartverket sikre at vi ikke 
        leverer ut innhold i dokumentet som anses som taushetsbelagte opplysninger. 
        Disse bestillingene må derfor til behandling før det blir tilgjengelig for deg.
      </Details.Content>
    </Details>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card>
      <Details>
        <Details.Summary>
          Hvorfor må Kartverket behandle bestillingen min
        </Details.Summary>
        <Details.Content>
          Når du bestiller et eiendomsdokument mottar du en attestert eller bekreftet 
          utskrift. Ved bestilling av attestert dokument må Kartverket sikre at vi ikke 
          leverer ut innhold i dokumentet som anses som taushetsbelagte opplysninger. 
          Disse bestillingene må derfor til behandling før det blir tilgjengelig for deg.
        </Details.Content>
      </Details>
    </Card>
  ),
};

export const InCardWithColor: Story = {
  render: () => (
    <>
    {/* TODO: adjust size and format to have padding? */}
    <Heading data-size='xs' >Når bør jeg bruke hvilken karttjeneste?</Heading>
    <Card>
      <Details>
        <Details.Summary>
          Topografisk kart
        </Details.Summary>
        <Details.Content>
          Topografisk kart gir oversikt over terreng, bygninger, vann og infrastruktur. 
          Når du åpner kartet, får du et helhetlig bilde av landskapet, noe som er nyttig 
          i planlegging av turer, beredskap, orientering i felt eller som bakgrunn i analyser.
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>
          Eiendomskart
        </Details.Summary>
        <Details.Content>
          Eiendomskart gir detaljert informasjon om eiendomsgrenser, adresser og bygninger. 
          Når du åpner dette valget, kan du se hvilke grenser som er registrert i matrikkelen, 
          kontrollere eiendomsforhold og bruke dataene i forbindelse med saksbehandling, planlegging 
          eller dialog med brukere.
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>
          Høydedata
        </Details.Summary>
        <Details.Content>
          Høydedata gir tilgang til detaljerte terreng- og høydemodeller. Når du åpner innholdet, 
          får du innsikt i hvordan terrenget faktisk ser ut. Dette er særlig nyttig for analyser av 
          flomsoner, skredfare, vannveier, landskapsendringer eller andre oppgaver som krever høy 
          nøyaktighet.
        </Details.Content>
      </Details>
    </Card>
    </>
  ),
};
