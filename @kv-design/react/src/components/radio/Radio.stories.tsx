import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { Fieldset } from '../fieldset/Fieldset';

const meta = {
  component: Radio,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Radio',
  },
};

export const InLine: Story = {
  args: {
    label: 'Radio',
  },
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Kontaktes på e-post?</Fieldset.Legend>
      <Fieldset.Description>
        Bekreft om du ønsker å bli kontaktet per e-post.
      </Fieldset.Description>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-6)' }}
      >
        <Radio name='my-inline' label='Ja' value='ja' />
        <Radio name='my-inline' label='Nei' value='nei' />
      </div>
    </Fieldset>
  )
}