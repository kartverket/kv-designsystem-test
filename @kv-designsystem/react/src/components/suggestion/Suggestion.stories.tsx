import type { Meta, StoryObj } from '@storybook/react-vite';
import { Suggestion } from './Suggestion';
import { subcomponents } from './docs/subcomponents';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
import { useState, type ComponentProps } from 'react';
import { Spinner } from '../spinner/Spinner';
import { screenReaderTextArgType } from '../../../.storybook/utils/screenReaderTextArgType';

// Not props, but data attributes Suggestion reads its screen reader texts from. Added so
// Controls shows the replacements for the deprecated props `aria-label` on Suggestion.Clear,
// and `singular` and `plural` on Suggestion.List.
type SuggestionStoryArgs = ComponentProps<typeof Suggestion> & {
	'data-sr-clear'?: string;
	'data-sr-singular'?: string;
	'data-sr-plural'?: string;
};

const meta = {
	component: Suggestion,
	subcomponents,
	parameters: { layout: 'centered' },
	argTypes: {
		'data-sr-clear': screenReaderTextArgType({
			description: 'Screen reader label of the clear button. Replaces `aria-label` on `Suggestion.Clear`.',
			defaultValue: 'Clear input',
		}),
		'data-sr-singular': screenReaderTextArgType({
			description: 'The screen reader announcement for singular Suggestion, where %d is the number of Suggestions.',
			defaultValue: '%d hit',
		}),
		'data-sr-plural': screenReaderTextArgType({
			description: 'The screen reader announcement for plural Suggestions, where %d is the number of Suggestions.',
			defaultValue: '%d hits',
		}),
	},
} satisfies Meta<SuggestionStoryArgs>;

export default meta;

type Story = StoryObj<SuggestionStoryArgs>;

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
	render: (args: SuggestionStoryArgs) => (
		<Field>
			<Label>Velg et fylke</Label>
			<Suggestion {...args}>
				<Suggestion.Input />
				<Suggestion.Clear />
				<Suggestion.List>
					<Suggestion.Empty>Ingen treff</Suggestion.Empty>
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

export const Multiple: Story = {
	args: {
		multiple: true,
		style: { width: '300px' },
	},
	render: (args: SuggestionStoryArgs) => (
		<Field>
			<Label>Velg ett eller flere fylker</Label>
			<Suggestion {...args}>
				<Suggestion.Input />
				<Suggestion.Clear />
				<Suggestion.List>
					<Suggestion.Empty>Ingen treff</Suggestion.Empty>
					{DATA_PLACES.map((place) => (
						<Suggestion.Option key={place} label={place} value={place.toLowerCase()}>
							{place}
						</Suggestion.Option>
					))}
				</Suggestion.List>
			</Suggestion>
		</Field>
	)
}

export const Filter: Story = {
	args: {
		filter: true,
	},
	render: (args: SuggestionStoryArgs) => (
		<Field>
			<Label>Hvilket fylke bor du i?</Label>
			<Suggestion {...args}>
				<Suggestion.Input />
				<Suggestion.Clear />
				<Suggestion.List>
					<Suggestion.Empty>Ingen treff</Suggestion.Empty>
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

const storyParams = { docs: { source: { type: 'code' } } };

export const AsyncData: Story = {
	parameters: storyParams,
	render: (args: SuggestionStoryArgs) => {
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
				<Label>Hvilket fylke bor du i?</Label>
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
