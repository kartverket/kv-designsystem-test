import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta = {
  component: Divider,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <div style={{textAlign: 'center'}}>
      <Paragraph >
        Divider er brukt for å dele opp innhold i mindre deler.
      </Paragraph>
      <Divider />
      <Paragraph>
        Den kan også brukes for å skille innhold som er relatert til hverandre.
      </Paragraph>
    </div>
  ),
};
