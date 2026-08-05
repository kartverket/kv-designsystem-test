import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { Tooltip } from '../tooltip/Tooltip';
import { Buildings2Icon, FilesIcon, CogIcon } from '@navikt/aksel-icons';

const meta = {
  component: Tabs,
  parameters: { layout: 'centered' },
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
      <Tabs.Panel value='value1'>Innhold for Tab 1</Tabs.Panel>
      <Tabs.Panel value='value2'>Innhold for Tab 2</Tabs.Panel>
      <Tabs.Panel value='value3'>Innhold for Tab 3</Tabs.Panel>
    </Tabs>
  ),
};

export const IconsOnly: Story = {
  render: (_args) => (
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
        <Tooltip content='Innstillinger'>
          <Tabs.Tab value='innstillinger'>
            <CogIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
      </Tabs.List>
      <Tabs.Panel value='bygninger'>Innhold for bygninger</Tabs.Panel>
      <Tabs.Panel value='dokumenter'>Innhold for dokumenter</Tabs.Panel>
      <Tabs.Panel value='innstillinger'>Innhold for innstillinger</Tabs.Panel>
    </Tabs>
  )
};

export const IconsWithText: Story = {
  render: (_args) => (
    <Tabs defaultValue='bygninger'>
      <Tabs.List>
        <Tabs.Tab value='bygninger'>
          <Buildings2Icon aria-hidden />
          Bygninger
        </Tabs.Tab>
        <Tabs.Tab value='dokumenter'>
          <FilesIcon aria-hidden />
          Dokumenter
        </Tabs.Tab>
        <Tabs.Tab value='innstillinger'>
          <CogIcon aria-hidden />
          Innstillinger
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='bygninger'>Innhold for bygninger</Tabs.Panel>
      <Tabs.Panel value='dokumenter'>Innhold for dokumenter</Tabs.Panel>
      <Tabs.Panel value='innstillinger'>Innhold for innstillinger</Tabs.Panel>
    </Tabs>
  )
};
