import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';

const meta = {
  component: Input,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {};

export const WithLabel: Story = {
  render: () => (
    <Field>
      <Label>Fødselsnummer</Label>
      <Input />
    </Field>
  )
};

export const WithError: Story = {
  render: () => (
    <Field>
      <Label>Fødselsnummer</Label>
      <Input aria-invalid />
    </Field>
  )
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <Label>Fødselsnummer</Label>
      <Input disabled value='12345678901' />
    </Field>
  )
};

export const ReadOnly: Story = {
  render: () => (
    <Field>
      <Label>Fødselsnummer</Label>
      <Input readOnly value='12345678901' />
    </Field>
  )
};
