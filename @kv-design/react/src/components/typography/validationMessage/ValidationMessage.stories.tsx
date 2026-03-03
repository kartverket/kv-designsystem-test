import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationMessage } from './ValidationMessage';

const meta = {
  component: ValidationMessage,
  parameters: {layout: 'centered'},
  title: 'Components/Typography/ValidationMessage',
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'ValidationMessage',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ValidationMessage data-color='danger'>
        Dette er en feilmelding.
      </ValidationMessage>

      <ValidationMessage data-color='success'>
        Dette er en suksessmelding.
      </ValidationMessage>

      <ValidationMessage data-color='info'>
        Dette er en informasjonsmelding.
      </ValidationMessage>

      <ValidationMessage data-color='warning'>
        Dette er en advarsel.
      </ValidationMessage>
    </div>
  )
}