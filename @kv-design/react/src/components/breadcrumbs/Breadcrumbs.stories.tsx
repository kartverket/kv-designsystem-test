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
        // children: 'Breadcrumbs',
        'aria-label':'Du er her:',
    },
    render: (args) => (
        <>
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
        </>
    ),
};