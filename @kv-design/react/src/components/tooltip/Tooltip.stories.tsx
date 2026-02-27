import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';

const meta = {
  component: Tooltip,
  parameters: {layout: 'centered'},
  args: {
    // Children is required in Tooltip props, so we must set something
    children: undefined,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: add ICON
export const Preview: Story = {
  args: {
    content:'Kopier',
  },
  render: (args) => (
    <Tooltip {...args} placement='top'>
      <Button icon aria-label='Kopier'>
        ICON
        {/* <FilesIcon aria-hidden /> */}
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
  )
};

// TODO: add ICONs
export const Placement: Story = {
  args: {
    content: ''
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
      <Tooltip placement="left" content="Slett">
        <Button icon variant="secondary">
          {/* <TrashIcon aria-hidden /> */}
          ICON
        </Button>
      </Tooltip>
      <Tooltip placement="top" content="Lagre">
        <Button icon variant="secondary">
          {/* <FloppydiskIcon aria-hidden /> */}
          ICON
        </Button>
      </Tooltip>
      <Tooltip placement="bottom" content="ctrl + p">
        <Button icon variant="secondary">
          {/* <PrinterSmallIcon aria-hidden /> */}
          ICON
        </Button>
      </Tooltip>
      <Tooltip placement="right" content="Kopier">
        <Button icon variant="secondary">
          {/* <FilesIcon aria-hidden /> */}
          ICON
        </Button>
      </Tooltip>
    </div>
  )

}