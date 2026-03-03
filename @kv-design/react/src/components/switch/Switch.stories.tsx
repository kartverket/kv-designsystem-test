import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Fieldset } from '../fieldset/Fieldset';
import { Divider } from '../divider/Divider';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
import { Input } from '../input/Input';
import { Heading } from '../typography/heading/Heading';

const meta = {
  component: Switch,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Switch',
  },
};

export const Group: Story = {
  args: {
    label: 'Switch',
    defaultChecked: true,
  },
  render: (args) => (
    <Fieldset>
      <Fieldset.Legend>Skru av/på lys</Fieldset.Legend>
      <Switch label='Stue' defaultChecked />
      <Switch label='Kjøkken' />
      <Switch label='Bad' />
      <Switch
        label='Soverom'
        description='Får ikke kontakt med lyspærene'
        readOnly
      />
    </Fieldset>
  )
};

export const RightAligned: Story = {
  args: {
    label: 'Switch',
  },
  render: (args) => (
    <Fieldset>
      <Fieldset.Legend>
        <Heading level={2}>Innstillinger</Heading>
      </Fieldset.Legend>
      <Fieldset.Description>
        Innstillinger som gjelder hele systemet.
      </Fieldset.Description>
      <Switch position='end' label="Flymodus" />
      <Switch position='end' label="Lydløs" defaultChecked />
    </Fieldset>
  )
}

