import preview from '../../../.storybook/preview';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta = {
  component: Link,
  tags: ['alfa', 'digdir'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: undefined,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story ={
  args: {
    href: 'https://www.kartverket.no/',
    children: 'Gå til kartverket.no',
  },
};

// TODO: add icon
export const WithIcon:  Story = {
  render: () => (
   <Link href='https://designsystemet.no/slack'>
      {/* <Chat2Icon aria-hidden fontSize={24} /> */}
      <span>Snakk med oss på Slack</span>
    </Link>
  ),
};

export const InText:  Story = {
  render: () => (
    <Paragraph>
      Vi bruker komponenter fra{' '}
      <Link href={'https://designsystemet.no/no'}>
        designsystemet.no
      </Link>
      .
    </Paragraph>
  ),
};

export const NeutralColor:  Story = {
  render: () => (
    <Link href={'https://www.kartverket.no/om-kartverket/personvern'} data-color='neutral'>
      Kartverkets personvernerklæring
    </Link>
  ),
};

// TODO: make the link actually go over multiple lines
export const LongLink:  Story = {
  parameters: {
    customStyles: { width: '200px' },
  },
  render: (args) => (
    <Paragraph>
      <Link href="https://www.kartverket.no/" {...args}>
        Dette er en lenke som brekker over flere linjer
      </Link>
    </Paragraph>
  ),
};

// TODO: add icon
export const File:  Story = {
  args: {
    href: 'https://kartverket.no/globalassets/geodataarbeid/hoydemodell/samfunnsokonomisk-analyse-nasjonal-detaljert-hoydemodell.pdf'
  },
  render: (args) => (
    <Link {...args}>
      {/* <FilePdfFillIcon aria-hidden /> */}
      <span>Samfunnsøkonomisk analyse (PDF, 2.1MB)</span>
    </Link>
  ),
};