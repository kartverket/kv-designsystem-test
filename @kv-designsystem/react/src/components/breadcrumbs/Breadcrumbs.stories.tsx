import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList } from './Breadcrumbs';
import { Breadcrumbs as StorybookBreadcrumbs } from './docs/StorybookBreadcrumbs';

const meta = {
	component: StorybookBreadcrumbs,
	subcomponents: {
    'Breadcrumbs.Item': BreadcrumbsItem,
    'Breadcrumbs.Link': BreadcrumbsLink,
    'Breadcrumbs.List': BreadcrumbsList,
  },
	parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
	args: {
		'aria-label':'Du er her:',
	},
	render: (args) => (
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
				<Breadcrumbs.Link href='#'>Kartverket</Breadcrumbs.Link>
			</Breadcrumbs.Item>
			<Breadcrumbs.Item>
				<Breadcrumbs.Link href='#'>Til lands</Breadcrumbs.Link>
			</Breadcrumbs.Item>
			<Breadcrumbs.Item>
				<Breadcrumbs.Link href='#'>Stadnamn</Breadcrumbs.Link>
			</Breadcrumbs.Item>
			<Breadcrumbs.Item>
				<Breadcrumbs.Link href='#'>Søk stadnamn i kart</Breadcrumbs.Link>
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
		<Breadcrumbs {...args}>
			<Breadcrumbs.Link
				aria-label='Tilbake til Stadnamn'
				href='#'
			>
				Stadnamn
			</Breadcrumbs.Link>
		</Breadcrumbs>
	),
};
