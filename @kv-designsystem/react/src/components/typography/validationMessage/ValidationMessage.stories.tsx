import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationMessage } from './ValidationMessage';
import { Grid } from 'src/components/layout/Grid';

const meta = {
  component: ValidationMessage,
  title: 'Components/Typography/ValidationMessage',
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'ValidationMessage',
  },
};

export const AllColors: Story = {
  render: (_args) => (
    <Grid>
      <ValidationMessage data-color="danger">Dette er en feilmelding.</ValidationMessage>
      <ValidationMessage data-color="success">Dette er en suksessmelding.</ValidationMessage>
      <ValidationMessage data-color="info">Dette er en informasjonsmelding.</ValidationMessage>
      <ValidationMessage data-color="warning">Dette er en advarsel.</ValidationMessage>
    </Grid>
  ),
};
