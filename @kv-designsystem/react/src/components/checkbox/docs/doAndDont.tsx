import { Do, DoDontGroup, Dont } from '.storybook/docs/components/DoDont/DoDont';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Checkbox } from '../Checkbox';
import { Heading } from 'src/components/typography/heading/Heading';

export const CheckboxEx1 = () => {
  return (
    <DoDontGroup>
      <Do description="Formuler spørsmål og svar som en samtale mellom to parter.">
        <Fieldset>
          <Fieldset.Legend>Hva vil du melde inn om eiendommen?</Fieldset.Legend>
          <Checkbox label="Feil i eiendomsgrenser" value="eiendomsgrenser" />
          <Checkbox label="Feil eller manglende adresse" value="adresse" />
          <Checkbox label="Endring i bygningsinformasjon" value="bygningsinformasjon" />
        </Fieldset>
      </Do>
      <Dont description="Ikke bruk passivt språk.">
        <Fieldset>
          <Fieldset.Legend>Meldes inn om eiendommen</Fieldset.Legend>
          <Checkbox label="Feil i eiendomsgrenser" value="eiendomsgrenser" />
          <Checkbox label="Feil eller manglende adresse" value="adresse" />
          <Checkbox label="Endring i bygningsinformasjon" value="bygningsinformasjon" />
        </Fieldset>
      </Dont>
    </DoDontGroup>
  );
};

export const CheckboxEx2 = () => {
  return (
    <DoDontGroup>
      <Do description="Bruk enkeltord eller korte setninger for forklaring og alternativer">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-6)',
          }}
        >
          <Heading level={3} data-size="xs">
            Filtrer resultater
          </Heading>
          <Fieldset>
            <Fieldset.Legend>Område</Fieldset.Legend>
            <Checkbox label="Alna" />
            <Checkbox label="Bjerke" />
            <Checkbox label="Frogner" />
          </Fieldset>
          <Fieldset>
            <Fieldset.Legend>Kartlag</Fieldset.Legend>
            <Checkbox label="Gåstier" />
            <Checkbox label="Skiløyper" />
          </Fieldset>
        </div>
      </Do>
      <Dont description="Ikke bruk unødvendig lange setninger">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-6)',
          }}
        >
          <Heading level={3} data-size="xs">
            Filtrer resultater
          </Heading>
          <Fieldset>
            <Fieldset.Legend>Hvilke områder er du interessert i?</Fieldset.Legend>
            <Checkbox label="Barnehage" />
            <Checkbox label="Grunnskole" />
            <Checkbox label="Videregående" />
          </Fieldset>
          <Fieldset>
            <Fieldset.Legend>Hvilke kartlag ønsker du å se?</Fieldset.Legend>
            <Checkbox label="Kunnskapsløftet 2020" />
            <Checkbox label="Kunnskapsløftet 2006" />
          </Fieldset>
        </div>
      </Dont>
    </DoDontGroup>
  );
};
