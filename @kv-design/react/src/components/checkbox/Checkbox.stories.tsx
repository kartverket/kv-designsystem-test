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
    label: 'Jeg bekrefter at opplysningene jeg har oppgitt er riktige',
    value:'samtykke'
  },
  render: (args, context) => (
    <Fieldset>
      <Fieldset.Legend>Bekreft at opplysningene er riktige</Fieldset.Legend>
      <Fieldset.Description>
        Før du sender inn meldingen om luftfartshindre, må du bekrefte at informasjonen 
        du har oppgitt er korrekt. Dette bidrar til at vi kan behandle henvendelsen på en 
        trygg og forutsigbar måte.
      </Fieldset.Description>
      <Checkbox id= {context.id} {...args} />
    </Fieldset>
  )
};

// TODO: create Do-Don't-story functionality