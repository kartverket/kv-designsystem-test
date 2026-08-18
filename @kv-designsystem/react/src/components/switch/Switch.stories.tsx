import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Fieldset } from '../fieldset/Fieldset';
import { Heading } from '../typography/heading/Heading';
import { Field } from '@digdir/designsystemet-react';

const meta = {
  component: Switch,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Switch',
  }
};

export const Group: Story = {
  args: {
    label: 'Switch',
    defaultChecked: true,
  },
  render: (args) => (
    <Fieldset>
      <Fieldset.Legend>Matrikkeldata</Fieldset.Legend>
      <Switch label='Adresser' defaultChecked />
      <Switch label='Bygninger' />
      <Switch label='Teiger og grenser' />
    </Fieldset>
  ),
};

export const Outline: Story = {
  args: {
    label: 'Switch',
    defaultChecked: true,
  },
  render: (args) => (
    <Fieldset>
      <Fieldset.Legend>Aktiver varslinger</Fieldset.Legend>
      <Switch variant='outline' label='Driftsmeldinger' defaultChecked />
      <Switch variant='outline' label='Påminnelser' />
      <Switch 
        variant='outline' 
        label='SMS-varsler' 
        description='Mangler gyldig telefonnummer i profilen' />
    </Fieldset>
  )
}

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
      <Switch position='end' label='Mørk modus' defaultChecked />
      <Switch position='end' label='Automatiske oppdateringer' />
    </Fieldset>
  ),
};
