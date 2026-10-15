import { Do, DoDontGroup, Dont } from '.storybook/docs/components/DoDont/DoDont';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Radio } from '../Radio';

export const RadioEx1 = () => {
  return (
    <DoDontGroup>
      <Do description="Formuler spørsmål og svar som en samtale mellom to parter.">
        <Fieldset>
          <Fieldset.Legend>Hva vil du melde inn om eiendommen?</Fieldset.Legend>
          <Radio name="radio-ex-1-do" label="Feil i eiendomsgrenser" value="eiendomsgrenser" />
          <Radio name="radio-ex-1-do" label="Feil eller manglende adresse" value="adresse" />
          <Radio name="radio-ex-1-do" label="Endring i bygningsinformasjon" value="bygningsinformasjon" />
        </Fieldset>
      </Do>
      <Dont description="Ikke bruk passivt språk.">
        <Fieldset>
          <Fieldset.Legend>Meldes inn om eiendommen</Fieldset.Legend>
          <Radio name="radio-ex-1-dont" label="Feil i eiendomsgrenser" value="eiendomsgrenser" />
          <Radio name="radio-ex-1-dont" label="Feil eller manglende adresse" value="adresse" />
          <Radio name="radio-ex-1-dont" label="Endring i bygningsinformasjon" value="bygningsinformasjon" />
        </Fieldset>
      </Dont>
    </DoDontGroup>
  );
};
