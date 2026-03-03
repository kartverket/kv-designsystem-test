import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Button } from '../button/Button';

const meta = {
  component: Popover,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Popover',
  },
  render: (args) => (
    <Popover.TriggerContext>
      <Popover.Trigger>Åpne popover</Popover.Trigger>
      <Popover placement='top'>
        Popoveret gir en rask beskjed. Her kan du vise brukeren informasjon som
        er relevant for konteksten.
      </Popover>
    </Popover.TriggerContext>
  ),
};

// TODO: add icon
export const Interactive: Story = {
  render: () => (
    <Popover.TriggerContext>
      <Popover.Trigger data-color='danger' aria-label='Slett rad'>
        {/* <TrashIcon title='Slett rad' /> */}
      </Popover.Trigger>
      <Popover data-color='danger'>
        <Paragraph>
          Er du sikker på at du vil slette raden? Handlingen kan ikke angres.
        </Paragraph>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-size-2)',
            marginTop: 'var(--ds-size-2)',
          }}
        >
          <Button data-size='sm'>Ja, slett den</Button>
          <Button data-size='sm' variant='tertiary'>
            Avbryt
          </Button>
        </div>
      </Popover>
    </Popover.TriggerContext>
  ),
};

export const DottedUnderline: Story = {
  render: () => (
    <Popover.TriggerContext>
      <Paragraph>
        Systemet beregner avstander basert på valgt <Popover.Trigger inline>kartprojeksjon</Popover.Trigger>.
      </Paragraph>
      <Popover data-color='neutral'>
        <Paragraph>
          <strong
            style={{
              display: 'block',
            }}
          >
            Kartprojeksjon
          </strong>
          En matematisk metode som overfører jordens krumme overflate til et flatt kart.
        </Paragraph>
      </Popover>
    </Popover.TriggerContext>
  )
}
