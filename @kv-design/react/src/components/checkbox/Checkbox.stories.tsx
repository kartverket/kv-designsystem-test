import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Fieldset } from '../fieldset/Fieldset';

const meta = {
  component: Checkbox,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Checkbox'
  },
};

export const OneOption: Story = {
  args: {
    label: 'Jeg bekrefter at jeg er over 18 år',
    value:'samtykke'
  },
  render: (args, context) => (
    <Fieldset>
      <Fieldset.Legend>Bekreft at du er over 18 år</Fieldset.Legend>
      <Fieldset.Description>
        For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at
        du er myndig.
      </Fieldset.Description>
      <Checkbox id= {context.id} {...args} />
    </Fieldset>
  )
};




