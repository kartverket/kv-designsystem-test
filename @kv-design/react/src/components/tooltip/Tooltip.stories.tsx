import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';
import { 
  FilesIcon,
  FloppydiskIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@navikt/aksel-icons';

const meta = {
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    // Children is required in Tooltip props, so we must set something
    children: undefined,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    content:'Kopier',
  },
  render: (args) => (
    <Tooltip {...args} placement='top'>
      <Button icon aria-label='Kopier'>
        <FilesIcon aria-hidden />
      </Button>
    </Tooltip>
  ),
};

export const WithText: Story = {
  args: {
    content:'Organisasjonsnummer',
  },
  render: (args) => (
    <Tooltip {...args}>Org.nr.</Tooltip>
  ),
};

export const Placement: Story = {
  args: {
    content: ''
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
      <Tooltip placement='left' content='Slett'>
        <Button icon variant='secondary'>
          <TrashIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip placement='top' content='Lagre'>
        <Button icon variant='secondary'>
          <FloppydiskIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip placement='bottom' content='Skriv ut'>
        <Button icon variant='secondary'>
          <PrinterSmallIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip placement='right' content='Kopier'>
        <Button icon variant='secondary'>
          <FilesIcon aria-hidden />
        </Button>
      </Tooltip>
    </div>
  ),
};
