import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import { Label } from '../typography/label/Label';
import { Field } from '../field/Field';

const meta = {
  component: Textarea,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    disabled: false,
    readOnly: false,
    rows: 3,
    cols: 20,
    id: 'my-textarea',
  },
  render: (args) => (
    <Field>
      <Label htmlFor='my-textarea'>Label</Label>
      <Textarea {...args} />
    </Field>
  ),
};
