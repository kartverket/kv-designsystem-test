import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';
import { Radio } from '../radio/Radio';
import { Checkbox } from '../checkbox/Checkbox';
import { Heading } from '../typography/heading/Heading';

const meta = {
  component: Fieldset,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (_args) => (
    <Fieldset>
      <Fieldset.Legend>Hvilken fjordarm bor du ved?</Fieldset.Legend>
      <Fieldset.Description>
        Valget vil hjelpe oss å forbedre innholdet vi viser deg.
      </Fieldset.Description>
      <Radio label='Barsnesfjorden' name='radio' value='barsnesfjorden' />
      <Radio label='Eidsfjorden' name='radio' value='eidsfjorden' />
      <Radio label='Ingen av de' name='radio' value='ingen-av-de' />
    </Fieldset>
  )
};

export const WithCheckbox: Story = {
  render: (_args) => (
    <Fieldset>
      <Fieldset.Legend>Godtar du vilkårene?</Fieldset.Legend>
      <Checkbox label='Ja, jeg godtar' value='agree' />
    </Fieldset>
  )
};

export const LegendAsHeading: Story = {
  render: (_args) => (
    <Fieldset>
      <Fieldset.Legend>
        <Heading
          data-size='sm'
          level={2}
        >
          Hvilke tjenester bruker du?
        </Heading>
      </Fieldset.Legend>
      <Fieldset.Description>
        Kartløsninger hos Kartverket
      </Fieldset.Description>
      <Checkbox
        id='components-fieldset--legend-as-heading-norgeskart'
        label='Norgeskart'
        name='components-fieldset--legend-as-heading-norgeskart'
        value='norgeskart'
      />
      <Checkbox
        id='components-fieldset--legend-as-heading-den-norske-los'
        label='Den norske los'
        name='components-fieldset--legend-as-heading-den-norske-los'
        value='den-norske-los'
      />
      <Checkbox
        id='components-fieldset--legend-as-heading-hoydedata'
        label='Høydedata'
        name='components-fieldset--legend-as-heading-hoydedata'
        value='hoydedata'
      />
    </Fieldset>
  )
};
