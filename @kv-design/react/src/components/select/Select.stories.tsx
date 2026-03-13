import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';

const meta = {
  component: Select,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fylker = [
  'Agder',
  'Akershus',
  'Buskerud',
  'Finnmark',
  'Innlandet',
  'Møre og Romsdal',
  'Nordland',
  'Oslo',
  'Rogaland',
  'Telemark',
  'Troms',
  'Trøndelag',
  'Vestfold',
  'Vestland',
  'Østfold',
];

export const Preview: Story = {
  render: () => (
    <Field>
      <Label>Velg et fylke</Label>
      <Select defaultValue=''>
        <Select.Option value='' disabled>
          Velg et fylke &hellip;
        </Select.Option>
        {fylker.map((fylke) => (
          <Select.Option key={fylke} value={fylke}>
            {fylke}
          </Select.Option>
        ))}
      </Select>
    </Field>
  ),
};

export const WithOptgroup: Story = {
  render: () => (
    <Field>
      <Label>Velg en park</Label>
      <Select>
        <Select.Optgroup label='Grünerløkka'>
          <Select.Option value='sofienbergparken'>
            Sofienbergparken
          </Select.Option>
          <Select.Option value='birkelunden'>Birkelunden</Select.Option>
          <Select.Option value='olafryesplass'>Olaf Ryes plass</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label='Sentrum'>
          <Select.Option value='slottsparken'>Slottsparken</Select.Option>
          <Select.Option value='studenterlunden'>Studenterlunden</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label='Gamle Oslo'>
          <Select.Option value='botsparken'>Botsparken</Select.Option>
          <Select.Option value='klosterenga'>Klosterenga park</Select.Option>
        </Select.Optgroup>
      </Select>
    </Field>
  )
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select disabled>
        <Select.Option value='blank'>Velg &hellip;</Select.Option>
        <Select.Option value='everest'>Mount Everest</Select.Option>
      </Select>
    </Field>
  )
};

export const ReadOnly: Story = {
  args: {
    readOnly: true
  },
  render: (args) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select aria-readonly value='everest' {...args}>
        <Select.Option value='everest'>Mount Everest</Select.Option>
      </Select>
    </Field>
  )
};
