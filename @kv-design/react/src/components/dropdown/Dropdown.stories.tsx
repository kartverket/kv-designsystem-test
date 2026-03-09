import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import { 
  LinkIcon,
} from '@navikt/aksel-icons';

const meta = {
  component: Dropdown,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
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

// TODO: Change github-link to correct link
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
                <a
                  href='https://github.com/kartverket/kvib'
                  target='_blank'
                  rel='noreferrer'
                >
                  <LinkIcon aria-hidden />
                  Github
                </a>
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button asChild>
                <a href='https://kartverket.no' target='_blank' rel='noreferrer'>
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

// TODO: doesn't show selected
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
