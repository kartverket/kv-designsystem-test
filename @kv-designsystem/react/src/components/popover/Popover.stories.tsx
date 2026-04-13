import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Button } from '../button/Button';
import { TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

const meta = {
  component: Popover,
  parameters: { layout: 'centered' },
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
        Popoveren gir en rask beskjed. Her kan du vise brukeren informasjon som
        er relevant for konteksten.
      </Popover>
    </Popover.TriggerContext>
  ),
};

export const Interactive: Story = {
  render: (_args) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover.TriggerContext>
        <Popover.Trigger
          data-color='danger'
          aria-label='Slett rad' 
          onClick={() => setOpen(!open)}>
          <TrashIcon title='Slett rad' aria-hidden />
        </Popover.Trigger>
        <Popover open={open} data-color='danger'>
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
            <Button data-size='sm' onClick={() => setOpen(false)}>Ja, slett den</Button>
            <Button data-size='sm' variant='tertiary' onClick={() => setOpen(false)}>
              Avbryt
            </Button>
          </div>
        </Popover>
      </Popover.TriggerContext>
    );
  },
};

export const DottedUnderline: Story = {
  render: (_args) => (
    <Popover.TriggerContext>
      <Paragraph>
        Systemet beregner avstander basert på valgt <Popover.Trigger inline>kartprojeksjon</Popover.Trigger>.
      </Paragraph>
      <Popover data-color='neutral'>
        <Paragraph>
          <strong>Kartprojeksjon</strong> er en matematisk metode som overfører jordens krumme overflate til et flatt kart.
        </Paragraph>
      </Popover>
    </Popover.TriggerContext>
  )
};
