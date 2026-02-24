import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Button } from '../button/Button';
import { Label } from '../typography/label/Label';
import { Textarea } from '../textarea/Textarea';
import { useState } from 'react';
import { Radio } from '../radio/Radio';
import type { DialogProps } from './Dialog';
import { Checkbox } from '../checkbox/Checkbox';
import { Fieldset } from '../fieldset/Fieldset';
import type { ChangeEvent } from 'react';

const meta = {
  component: Dialog,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Åpne modal Dialog</Dialog.Trigger>
      <Dialog id='my-dialog-modal'>
        <Dialog.Block>
          <Heading>Lagre før du går videre </Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph>
            For å gå videre må du lagre endringene. Du kan også avbryte og fortsette å redigere.
          </Paragraph>
        </Dialog.Block>
        <Dialog.Block>
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-4)',
              marginTop: 'var(--ds-size-4)',
            }}
          >
            {/* TODO: Seems like the 'command' works, even though we get an error*/}
            <Button
              variant='primary'
              data-color='danger'
              command='close'
              commandfor='my-dialog-modal'
            >
              Lagre
            </Button>
            <Button
              variant='secondary'
              command='close'
              commandfor='my-dialog-modal'
            >
              Avbryt
            </Button>
          </div>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

// TODO: The display doesn't fit the whole Dialog, change size
export const DialogNonModal: Story = {
  render: () => (
  <Dialog.TriggerContext>
    <Dialog.Trigger>Åpne ikke-modal Dialog</Dialog.Trigger>
    <Dialog
      modal={false}
      style={{
        zIndex: '10',
        top: 'calc(100vh - 290px)',
        left: 'calc(100vw - 385px)',
        margin: 0,
        maxWidth: '350px',
      }}
    >
      <Heading style={{ marginBottom: 'var(--ds-size-4)' }}>
        Vi ønsker din mening
      </Heading>
      <Label htmlFor='my-textarea'>Hvordan var din opplevelse?</Label>
      <Textarea
        id='my-textarea'
        style={{
          marginBottom: 'var(--ds-size-6)',
        }}
      />
      <Button>Send inn</Button>
    </Dialog>
  </Dialog.TriggerContext>
  ),
};

export const Drawer: Story = {
  render: () => {
    const [placement, setPlacement] = useState<DialogProps['placement']>('bottom');
    const [modal, setModal] = useState(true);

    return (
      <>
        <Checkbox
          label='Modal'
          checked={modal}
          style={{ marginBottom: 'var(--ds-size-4)' }}
          onChange={(e) => setModal(e.target.checked)}
        />
        <Fieldset
          onChange={(e: ChangeEvent<HTMLFieldSetElement>) => {
            const target = e.target as unknown as HTMLInputElement;
            setPlacement(target.value as DialogProps['placement']);
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--ds-size-5)',
              marginBottom: 'var(--ds-size-8)',
            }}
          >
            <Radio name='drawer' label='Center' value='center' />
            <Radio name='drawer' label='Top' value='top' />
            <Radio name='drawer' label='Bottom' value='bottom' />
            <Radio name='drawer' label='Left' value='left' />
            <Radio name='drawer' label='Right' value='right' />
          </div>
        </Fieldset>
        <Dialog.TriggerContext>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog
            modal={modal}
            closedby='any'
            placement={placement}
            style={{ zIndex: '10' }}
          >
            <Dialog.Block>
              <Paragraph>
                {/* TODO: the <code> doen't get the outline like all other examples in the Storybook */}
                This is a {modal ? 'modal' : 'non-modal'} Dialog with{' '}
                <code>placement='{placement}'</code>
              </Paragraph>
            </Dialog.Block>
          </Dialog>
        </Dialog.TriggerContext>
      </>
    );
  }
}
