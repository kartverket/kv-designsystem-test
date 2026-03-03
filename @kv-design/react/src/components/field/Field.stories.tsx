import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { Label } from '../typography/label/Label';
import { Input } from '../input/Input';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Textarea } from '../textarea/Textarea';
const meta = {
  component: Field,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = { 
  render: () => (
    <Field>
      <Label>Etternavn</Label>
      <Field.Description>
        Etternavn kan ikke inneholde mellomrom
      </Field.Description>
      <Input defaultValue='Nordmann Svenske' />
      <ValidationMessage>
        Du kan ikke ha mellomrom i etternavnet ditt
      </ValidationMessage>
    </Field>
  ),
};

export const Affix: Story = {
  render: () => (
    <Field>
      <Label>Hvor mange kroner koster det per måned?</Label>
      <Field.Affixes>
        <Field.Affix>NOK</Field.Affix>
        <Input />
        <Field.Affix>pr. mnd.</Field.Affix>
      </Field.Affixes>
    </Field>
  )
};

export const Counter: Story = {
  render: () => (
    <Field>
      <Label>Legg til en beskrivelse</Label>
      <Textarea rows={2} />
      <Field.Counter limit={10} />
    </Field>
  )
};

export const Position: Story = {
  render: () => (
    <>
      <Field position='end'>
        <Label>Flymodus</Label>
        <Input type='checkbox' role='switch' />
      </Field>
    </>
  )
}
