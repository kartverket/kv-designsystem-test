import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { Flex } from '../layout/Flex';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Button } from '../button/Button';
import { Popover } from './Popover';

const meta = {
  title: 'Komponenter/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Button popovertarget="popover-preview">Åpne popover</Button>
      <Popover id="popover-preview" placement="top" {...args}>
        Popoveren gir en rask beskjed. Her kan du vise brukeren informasjon som er relevant for
        konteksten.
      </Popover>
    </>
  ),
};

export const Interactive: Story = {
  render: (_args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button data-color="danger" aria-label="Slett rad" popovertarget="popover-interactive">
          <TrashIcon title="Slett rad" aria-hidden />
        </Button>
        <Popover
          id="popover-interactive"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          data-color="danger"
        >
          <Paragraph>Er du sikker på at du vil slette raden? Handlingen kan ikke angres.</Paragraph>
          <Flex flexWrap="nowrap" style={{ marginTop: 'var(--ds-size-2)' }}>
            <Button data-size="sm" onClick={() => setOpen(false)}>
              Ja, slett
            </Button>
            <Button
              data-size="sm"
              variant="tertiary"
              data-color="neutral"
              onClick={() => setOpen(false)}
            >
              Avbryt
            </Button>
          </Flex>
        </Popover>
      </>
    );
  },
};

export const DottedUnderline: Story = {
  render: (_args) => (
    <>
      <Paragraph>
        Systemet beregner avstander basert på valgt{' '}
        <button type="button" data-popover="inline" popovertarget="popover-dotted-underline">
          kartprojeksjon
        </button>
        .
      </Paragraph>
      <Popover id="popover-dotted-underline" data-color="neutral">
        <Paragraph>
          <strong>Kartprojeksjon</strong> er en matematisk metode som overfører jordens krumme
          overflate til et flatt kart.
        </Paragraph>
      </Popover>
    </>
  ),
};
