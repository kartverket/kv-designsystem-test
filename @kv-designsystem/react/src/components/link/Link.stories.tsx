import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Chat2Icon, FilePdfFillIcon } from '@navikt/aksel-icons';

const meta = {
  component: Link,
  parameters: { layout: 'centered' },
  args: {
    children: undefined,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story ={
  args: {
    href: 'https://www.kartverket.no/',
    children: 'Gå til kartverket.no',
  }
};

export const WithIcon:  Story = {
  render: () => (
   <Link href='https://designsystemet.no/slack'>
      <Chat2Icon aria-hidden fontSize={24} />
      <span>Snakk med oss på Slack</span>
    </Link>
  )
};

export const InText:  Story = {
  args: {
    href: 'https://designsystemet.no/no',
  },
  render: (args) => (
    <Paragraph>
      Vi bruker komponenter fra{' '}
      <Link {...args}>
        designsystemet.no
      </Link>
      .
    </Paragraph>
  ),
};

export const NeutralColor:  Story = {
  args: {
    href: 'https://www.kartverket.no/om-kartverket/personvern',
  },
  render: (args) => (
    <Link {...args} data-color='neutral'>
      Kartverkets personvernerklæring
    </Link>
  ),
};

export const LongLink:  Story = {
  args: {
    href: 'https://www.kartverket.no/',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
      <Paragraph>
      <Link {...args}>
        Dette er en lenke som brekker over flere linjer
      </Link>
    </Paragraph>
  ),
};

export const File:  Story = {
  args: {
    href: 'https://kartverket.no/globalassets/geodataarbeid/hoydemodell/samfunnsokonomisk-analyse-nasjonal-detaljert-hoydemodell.pdf'
  },
  render: (args) => (
    <Link {...args}>
      <FilePdfFillIcon aria-hidden />
      <span>Samfunnsøkonomisk analyse (PDF, 2.1MB)</span>
    </Link>
  ),
};