import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';

const meta = {
  component: Skeleton,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Skeleton',
    width: 200,
    height: 100,
  },
};

const schoolImage =
  'https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const UsageExample: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-size-12)',
        margin: 'var(--ds-size-12)',
      }}
    >
      <div style={{ flex: '1 1 200px' }}>
        <Skeleton height="200px" {...args} />
        <Heading>
          <Skeleton variant="text" width="15" />
        </Heading>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            padding: '5px 0',
          }}
        >
          <Skeleton variant="circle" width="40px" height="40px" {...args} />
          <Skeleton variant="text" {...args}>
            Forfatter | sist endret
          </Skeleton>
        </div>

        <Skeleton variant="text" width="200" />
      </div>

      <div style={{ flex: '1 1 200px' }}>
        <img
          src={schoolImage}
          alt="Kart"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />

        <Heading>Søk midtpunktfølelsen</Heading>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar
            data-size="xs"
            initials="KV"
            aria-label="Kartverket"
          />
          <Paragraph>Kartverket | 03.02.2026</Paragraph>
        </div>

        <Paragraph>
          Geografisk midtpunkt i alle fylker og kommuner er oppdatert. Dra hit for 
          å være i sentrum av begivnehetene, men vis hensyn til sårbart vilt. Under 
          Fakta om Norge finner du også høyeste punkt og mest øde sted.
        </Paragraph>
      </div>
    </div>
  ),
};

export const Children: Story = {
  render: () => (
    <Skeleton variant="rectangle">
      <Paragraph>
        Her er en tekst som blir sendt inn som barn av en Skeleton.
      </Paragraph>
      <Paragraph>
        Se hvordan Skeleton da dekker den samlede bredden og høyden til barna.
      </Paragraph>
      <Button>
        Knapp
      </Button>
    </Skeleton>
  )
};

