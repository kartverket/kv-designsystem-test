import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { Tooltip } from '../tooltip/Tooltip';

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

// TODO: add icons
export const IconsOnly: Story = {
  render: () => (
    <Tabs defaultValue='bygninger'>
      <Tabs.List>
        <Tooltip content='Bygninger'>
          <Tabs.Tab value='bygninger'>
            {/* <Buildings2Icon aria-hidden />  */}
            ICON
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Dokumenter'>
          <Tabs.Tab value='dokumenter'>
            {/* <FilesIcon aria-hidden /> */}
            ICON
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Instillinger'>
          <Tabs.Tab value='instillinger'>
            {/* <CogIcon aria-hidden /> */}
            ICON
          </Tabs.Tab>
        </Tooltip>
      </Tabs.List>
    </Tabs>
  )
};

// TODO: add icons
export const IconsWithText: Story = {
  render: () => (
    <Tabs defaultValue='bygninger'>
      <Tabs.List>
        <Tooltip content='Bygninger'>
          <Tabs.Tab value='bygninger'>
            {/* <Buildings2Icon aria-hidden />  */}
            [ICON]Bygninger
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Dokumenter'>
          <Tabs.Tab value='dokumenter'>
            {/* <FilesIcon aria-hidden /> */}
            [ICON]Dokumenter
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content='Instillinger'>
          <Tabs.Tab value='instillinger'>
            {/* <CogIcon aria-hidden /> */}
            [ICON]Instillinger
          </Tabs.Tab>
        </Tooltip>
      </Tabs.List>
    </Tabs>
  )
};

