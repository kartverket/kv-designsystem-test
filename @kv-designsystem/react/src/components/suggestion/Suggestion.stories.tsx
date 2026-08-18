import type { Meta, StoryObj } from '@storybook/react-vite';
import { Suggestion } from './Suggestion';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
import { useState } from 'react';
import { Spinner } from '../spinner/Spinner';

const meta = {
	component: Suggestion,
	parameters: { layout: 'centered' },
} satisfies Meta<typeof Suggestion>;

export default meta;

type Story = StoryObj<typeof meta>;

const DATA_PLACES = [
	'Agder',
	'Akershus',
	'Buskerud',
	'Innlandet',
	'Møre og Romsdal',
	'Nordland',
	'Oslo',
	'Rogaland',
	'Troms',
	'Finnmark',
	'Trøndelag',
	'Vestfold',
	'Telemark',
	'Vestland',
	'Østfold',
];

export const Preview: Story = {
	render: (args) => (
		<Field>
			<Label>Velg et fylke</Label>
			<Suggestion {...args}>
				<Suggestion.Input />
				<Suggestion.Clear />
				<Suggestion.List id='123'>
					<Suggestion.Empty>Tomt</Suggestion.Empty>
					{DATA_PLACES.map((place) => (
						<Suggestion.Option key={place} label={place} value={place.toLowerCase()}>
							{place}
						</Suggestion.Option>
					))}
				</Suggestion.List>
			</Suggestion>
		</Field>
	)
};

// TODO: add padding between chips and input-field when chips are visible. 
export const Multiple: Story = {
	args: {
		multiple: true,
		style: { width: '300px' },
	},
	render: Preview.render,
}

export const Filter: Story = {
	args: {
		filter: true,
	},
	render: Preview.render,
};

const storyParams = { docs: { source: { type: 'code' } } };

export const AsyncData: Story = {
	parameters: storyParams,
	render: (args) => {
		const [loading, setLoading] = useState(false);

		const handleInput = (event: React.InputEvent<HTMLInputElement>) => {
			const value = event.currentTarget.value.trim();

			if (!value) {
				setLoading(false);
				return;
			}

			setLoading(true);

			// Simulate an API call
			setTimeout(() => {
				setLoading(false);
			}, 1500);
		};

		return (
			<Field>
				<Label>Velg et fylke</Label>
				<Suggestion {...args}>
					<Suggestion.Input onInput={handleInput} />
					<Suggestion.Clear />
					<Suggestion.List>
						<Suggestion.Empty>
							{loading ? (
								<span style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-size-2)' }}>
									<Spinner aria-hidden='true' data-size='sm' />
									Laster...
								</span>
							) : (
								'Ingen treff'
							)}
						</Suggestion.Empty>
					</Suggestion.List>
				</Suggestion>
			</Field>
		)
	}
};
