import type { Meta, StoryObj } from '@storybook/react-vite';
import { Details } from './Details';

const meta = {
  component: Details,
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Details',
  },
  render: (args) => (
    <Details>
      <Details.Summary>
        Hvem kan registrere seg i Frivillighetsregisteret?
      </Details.Summary>
      <Details.Content>
        For å kunne bli registrert i Frivillighetsregisteret, må organisasjonen
        drive frivillig virksomhet. Det er bare foreninger, stiftelser og
        aksjeselskap som kan registreres. Virksomheten kan ikke dele ut midler
        til fysiske personer. Virksomheten må ha et styre.
      </Details.Content>
    </Details>
  ),
};
