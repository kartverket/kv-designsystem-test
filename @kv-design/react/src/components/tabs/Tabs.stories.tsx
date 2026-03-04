import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { Tooltip } from '../tooltip/Tooltip';
import { Buildings2Icon, FilesIcon, CogIcon } from '@navikt/aksel-icons';

const meta = {
  component: Tabs,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Tabs',
  },
  render: (args) => (
    <Tabs defaultValue='value1'>
      <Tabs.List>
        <Tabs.Tab value='value1'>Tab 1</Tabs.Tab>
        <Tabs.Tab value='value2'>Tab 2</Tabs.Tab>
        <Tabs.Tab value='value3'>Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='value1'>content 1</Tabs.Panel>
      <Tabs.Panel value='value2'>content 2</Tabs.Panel>
      <Tabs.Panel value='value3'>content 3</Tabs.Panel>
    </Tabs>
  ),
};

export const IconsOnly: Story = {
  render: () => (
    <Tabs defaultValue='bygninger'>
      <Tabs.List>
        <Tooltip content='Bygninger'>
          <Tabs.Tab value='bygninger'>
            <Buildings2Icon aria-hidden /> 
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Dokumenter'>
          <Tabs.Tab value='dokumenter'>
            <FilesIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Instillinger'>
          <Tabs.Tab value='instillinger'>
            <CogIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
      </Tabs.List>
    </Tabs>
  )
};

export const IconsWithText: Story = {
  render: () => (
    <Tabs defaultValue='bygninger'>
      <Tabs.List>
        <Tooltip content='Bygninger'>
          <Tabs.Tab value='bygninger'>
            <Buildings2Icon aria-hidden /> 
            Bygninger
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Dokumenter'>
          <Tabs.Tab value='dokumenter'>
            <FilesIcon aria-hidden />
            Dokumenter
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Instillinger'>
          <Tabs.Tab value='instillinger'>
            <CogIcon aria-hidden />
            Instillinger
          </Tabs.Tab>
        </Tooltip>
      </Tabs.List>
    </Tabs>
  )
};

