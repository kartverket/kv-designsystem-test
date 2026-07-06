import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import {
  LinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@navikt/aksel-icons';
import { useState } from 'react';

const meta = {
  component: Dropdown,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (_args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
      <Dropdown placement='bottom-end'>
        <Dropdown.Heading>First heading</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Button 1.1</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Button 1.2</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
        <Dropdown.Heading>Second heading</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Button 2.1</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Button 2.2</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  )
};

export const WithIcons: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger>Nyttige lenker</Dropdown.Trigger>
      <Dropdown {...args}>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button asChild>
              <a href='https://github.com/kartverket/kv-designsystem-test'>
                <LinkIcon aria-hidden />
                Github
              </a>
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button asChild>
              <a href='https://kartverket.no'>
                <LinkIcon aria-hidden />
                Kartverket.no
              </a>
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};

export const Controlled: Story = {
  args: {
    placement: 'bottom-end'
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger>
          Dropdown
          {open ? <ChevronDownIcon aria-hidden /> : <ChevronUpIcon aria-hidden />}
        </Dropdown.Trigger>
        <Dropdown
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          {...args}
        >
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Trykk på meg lukker
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Jeg lukker også
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
}
  ;
export const Selected: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger variant='secondary'>
        Velg kartlag
      </Dropdown.Trigger>
      <Dropdown {...args}>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>
              Eiendom
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item aria-current='true'>
            <Dropdown.Button>
              Tur og friluftsruter
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>
              Dybdedata
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};
