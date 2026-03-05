import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Tabs } from '../tabs/Tabs';
import { FloppydiskFillIcon, EnvelopeClosedFillIcon } from '@navikt/aksel-icons';

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    count: 15,
    maxCount: 9,  
  }
};

const ColorsMap: {
  [key: string]: { [key: string]: string };
} = {
  neutralBase: {
    'data-color': 'neutral',
  },
  neutralTinted: {
    'data-color': 'neutral',
    'data-variant': 'tinted',
  },
  dangerBase: {
    'data-color': 'danger',
  },
  dangerTinted: {
    'data-color': 'danger',
    'data-variant': 'tinted',
  },
  infoBase: {
    'data-color': 'info',
  },
  infoTinted: {
    'data-color': 'info',
    'data-variant': 'tinted',
  },
  warningBase: {
    'data-color': 'warning',
  },
  warningTinted: {
    'data-color': 'warning',
    'data-variant': 'tinted',
  },
  successBase: {
    'data-color': 'success',
  },
  successTinted: {
    'data-color': 'success',
    'data-variant': 'tinted',
  },
};

// TODO: fix styling to be implemented the same across all components
export const ColorVariants: Story = {
  args: {  
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 60px)',
          gap: 'var(--ds-size-2)',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      {Object.entries(ColorsMap).map(([key, value]) => (
        <Badge key={key} {...value} count={15} maxCount={9} />
      ))}
    </>
  ),
};

export const Status: Story = {
  args: {
    'data-color': 'success'
  },
  render: (args) => (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge {...args} style={{ marginInlineEnd: '0.5rem' }} />
        Aktiv
      </div>
    </>
  )
}

export const InTabs: Story = {
  render: () => (
    <Tabs defaultValue='value1'>
      <Tabs.List>
        <Tabs.Tab value='value1'>
          Favoritter
          <Badge count={64} maxCount={10} data-color='accent' />
        </Tabs.Tab>
        <Tabs.Tab value='value2'>Arkiv</Tabs.Tab>
        <Tabs.Tab value='value3'>
          Nylige
          <Badge count={2} data-color='accent' />
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='value1'>content 1</Tabs.Panel>
      <Tabs.Panel value='value2'>content 2</Tabs.Panel>
      <Tabs.Panel value='value3'>content 3</Tabs.Panel>
    </Tabs>
  )
};

export const Floating: Story = {
  args: {
    'data-color': 'danger'
  },
  render: (args) => (
    <Badge.Position placement='top-right'>
      <Badge data-color='danger' count={2}></Badge>
      <EnvelopeClosedFillIcon title='Meldinger' style={{ fontSize: '2rem' }} />
    </Badge.Position>
  ),
};
