import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { Label } from '../label/Label';
import { Input } from '../input/Input';
import { ValidationMessage } from '../validationMessage/ValidationMessage';

const meta = {
  component: Field,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Field',
  },
  render: (args) => (
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
