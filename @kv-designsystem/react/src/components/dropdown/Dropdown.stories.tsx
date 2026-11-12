import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkIcon, ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { Divider } from '../divider/Divider';
import { Button } from '../button/Button';
import { subcomponents } from './docs/subcomponents';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Komponenter/Dropdown',
  component: Dropdown,
  subcomponents,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Button popovertarget="dropdown-preview">Åpne Dropdown</Button>
      <Dropdown id="dropdown-preview" placement="bottom-end" {...args}>
        <Dropdown.Heading>Overskrift 1</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Knapp 1.1</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Knapp 1.2</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Knapp 1.3</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
        <Divider />
        <Dropdown.Heading>Overskrift 2</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Knapp 2.1</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Knapp 2.2</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </>
  ),
};

export const WithIcons: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => (
    <>
      <Button popovertarget="dropdown-with-icons">Nyttige lenker</Button>
      <Dropdown id="dropdown-with-icons" {...args}>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button asChild>
              <a href="https://kartverket.no">
                <LinkIcon aria-hidden />
                Kartverket
              </a>
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button asChild>
              <a href="https://www.geonorge.no/">
                <LinkIcon aria-hidden />
                Geonorge
              </a>
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button asChild>
              <a href="https://www.norgeskart.no/">
                <LinkIcon aria-hidden />
                Norgeskart
              </a>
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </>
  ),
};

export const Controlled: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button popovertarget="dropdown-controlled">
          Dropdown
          {open ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
        </Button>
        <Dropdown
          id="dropdown-controlled"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          {...args}
        >
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Trykk på meg for å lukke
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>Jeg lukker også</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
};

// TODO: when selecting another element the "selected mark" doesn't move
export const Selected: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => (
    <>
      <Button variant="secondary" popovertarget="dropdown-selected">
        Velg kartlag
      </Button>
      <Dropdown id="dropdown-selected" {...args}>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Eiendom</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item aria-current="true">
            <Dropdown.Button>Tur og friluftsruter</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Dybdedata</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </>
  ),
};
