import { DoDontGroup, Dont } from '.storybook/docs/components/DoDont/DoDont';
import { Field } from 'src/components/field/Field';
import { Label } from 'src/components/typography/label/Label';
import { Select } from '../Select';

export const SelectEx1 = () => {
  return (
    <DoDontGroup>
      <Dont description="Ikke bruk deaktivert Select.">
        <Field>
          <Label>Fjell</Label>
          <Select disabled>
            <Select.Option value="blank">Velg &hellip;</Select.Option>
            <Select.Option value="everest">Mount Everest</Select.Option>
          </Select>
        </Field>
      </Dont>
    </DoDontGroup>
  );
};
