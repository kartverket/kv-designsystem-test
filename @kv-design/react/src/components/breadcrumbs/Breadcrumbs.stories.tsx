import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
    component: Breadcrumbs,
    parameters: {layout: 'centered'},
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
    args: {
        'aria-label':'Du er her:',
    },
    render: (args) => (
        // TODO: In storybook-view code the outermost Breadcrumbs is swapped with React.ForwardRef
        <Breadcrumbs {...args}>
            <Breadcrumbs.Link href='#' aria-label='Tilbake til Nivå 3'>
                Nivå 3
            </Breadcrumbs.Link>
            <Breadcrumbs.List>
                <Breadcrumbs.Item>
                <Breadcrumbs.Link href='#'>Nivå 1</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Item>
                <Breadcrumbs.Link href='#'>Nivå 2</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Item>
                <Breadcrumbs.Link href='#'>Nivå 3</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Item>
                <Breadcrumbs.Link href='#'>Nivå 4</Breadcrumbs.Link>
                </Breadcrumbs.Item>
            </Breadcrumbs.List>
        </Breadcrumbs>
    ),
};

export const ListOnly: Story = {
    args: {
        'aria-label':'Du er her:',
    },
    render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Kartverket</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Til lands</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Stadnamn</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Søk stadnamn i kart</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
    ),
};

export const BackOnly: Story = {
    args: {
        'aria-label':'Du er her:',
    },
    render: (args) => (
        <Breadcrumbs>
        <Breadcrumbs.Link
            aria-label="Tilbake til Stadnamn"
            href="#"
        >
            Stadnamn
        </Breadcrumbs.Link>
        </Breadcrumbs>
    ),
};


