import type { Meta, StoryObj } from '@storybook/react-vite';
import { Suggestion } from './Suggestion';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
// import { Spinner } from '../spinner/Spinner';
// import { type ChangeEvent, useState } from 'react';
// import { useDebounceCallback } from '@digdir/designsystemet-react';

const meta = {
	component: Suggestion,
	parameters: { layout: 'centered' },
} satisfies Meta<typeof Suggestion>;

export default meta;

type Story = StoryObj<typeof meta>;

const DATA_PLACES = [
	'Sogndal',
  'Oslo',
  'Brønnøysund',
  'Stavanger',
  'Trondheim',
  'Bergen',
  'Lillestrøm',
];

export const Preview: Story = {
 	render: (args) => (
    <Field>
			<Label>Velg en destinasjon</Label>
			<Suggestion {...args}>
				<Suggestion.Input />
				<Suggestion.Clear />
				<Suggestion.List id='123'>
					<Suggestion.Empty>Tomt</Suggestion.Empty>
					{DATA_PLACES.map((place) => (
						<Suggestion.Option key={place} label={place} value={place}>
							{place}
							<div>Kommune</div>
						</Suggestion.Option>
					))}
				</Suggestion.List>
			</Suggestion>
		</Field>
 	)
};

// TODO: understand and fix this Story

// export const FetchExternal: Story = {
//   render: (args, { id }) => {
//     const [value, setValue] = useState('');
//     const [options, setOptions] = useState<string[] | null>(null);

//     const apiCall = async (value: string) => {
//       const api = `https://restcountries.com/v2/name/${value}?fields=name`;
//       const countries = await (await fetch(api)).json();

//       setOptions(
//         Array.isArray(countries)
//           ? countries.map(({ name }) => name)
//           : [],
//       );
//     };

//     const debounced = useDebounceCallback(apiCall, 500);

//     const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
//       const encoded = encodeURIComponent(event.target.value.trim());

//       setValue(event.target.value);
//       setOptions(null); // Clear options

//       if (!encoded) return;

//       debounced(encoded);
//     };

//     return (
//       <Field lang='en'>
//         <Label>Search for countries (in english)</Label>
//         <Suggestion {...args} filter={false}>
//           <Suggestion.Input id={id} onInput={handleInput} />
//           <Suggestion.Clear />
//           <Suggestion.List singular='%d country' plural='%d countries'>
//             {value ? (
//               <Suggestion.Empty>
//                 {options ? (
//                   'Ingen treff'
//                 ) : (
//                   <span
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 8,
//                     }}
//                   >
//                     <Spinner aria-hidden='true' data-size='sm' /> Laster...
//                   </span>
//                 )}
//               </Suggestion.Empty>
//             ) : null}

//             {options?.map((option) => (
//               <Suggestion.Option key={option}>
//                 {option}
//               </Suggestion.Option>
//             ))}
//           </Suggestion.List>
//         </Suggestion>
//       </Field>
//     );
//   },
// };
