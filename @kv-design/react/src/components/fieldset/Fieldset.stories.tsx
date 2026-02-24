import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';
import { Radio } from '../radio/Radio';
import { Checkbox } from '../checkbox/Checkbox';
import { Heading } from '../typography/heading/Heading';

const meta = {
  component: Fieldset,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Hvilken fjordarm bor du ved?</Fieldset.Legend>
      <Fieldset.Description>
        Valget vil hjelpe oss å forbedre innholdet vi viser deg.
      </Fieldset.Description>
      <Radio label='Barsnesfjorden' name='radio' value='barsnesfjorden' />
      <Radio label='Eidsfjorden' name='radio' value='eidsfjorden' />
      <Radio label='Ingen av de' name='radio' value='ingen-av-de' />
    </Fieldset>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Godtar du vilkårene?</Fieldset.Legend>
      <Checkbox label='Ja, jeg godtar' value='agree' />
    </Fieldset>
  )
};

// TODO: make example more relevant to Kartverket?
export const LegendAsHeading: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>
        <Heading
          data-size="sm"
          level={2}
        >
          Hvilke foretrekket du?
        </Heading>
      </Fieldset.Legend>
      <Fieldset.Description>
        Fellesbeskrivelse
      </Fieldset.Description>
      <Checkbox
        id="components-fieldset--legend-as-heading-alternativ-1"
        label="Alternativ 1"
        name="components-fieldset--legend-as-heading-alternativ-1"
        value="alternativ-1"
      />
      <Checkbox
        id="components-fieldset--legend-as-heading-alternativ-2"
        label="Alternativ-2"
        name="components-fieldset--legend-as-heading-alternativ-2"
        value="alternativ-2"
      />
    </Fieldset>
  )
}

