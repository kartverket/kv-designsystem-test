import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import { useState } from 'react';
import { Search } from '../search/Search';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta = {
  component: Chip.Radio,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip.Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Chip',
  }
};

export const Button: Story = {
  render: (_args) => {
    const [inputValue, setInputValue] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Search>
          <Search.Input
            aria-label='søk'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Search.Clear />
          <Search.Button type='submit' />
        </Search>
        <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
          <Paragraph>Hurtigsøk: </Paragraph>
          <Chip.Button onClick={() => setInputValue('Høydedata')}>
            Høydedata
          </Chip.Button>
          <Chip.Button onClick={() => setInputValue('Terrengmodell')}>
            Terrengmodell
          </Chip.Button>
          <Chip.Button onClick={() => setInputValue('Laserdata')}>
            Laserdata
          </Chip.Button>
        </div>
      </div>
    );
  }
};

export const Checkbox: Story = {
  render: (_args) => {
    const options = ['2020', '2021', '2022', '2023', '2024', '2025'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-2)',
        }}
      >
        <Paragraph>Vis data for</Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
          {options.map((year) => (
            <Chip.Checkbox key={year} aria-label={year}>
              {year}
            </Chip.Checkbox>
          ))}
        </div>
      </div>
    );
  }
};

export const Radio: Story = {
  render: (_args) => {
    const options = ['Sjøkart', 'Dybder', 'Sjømerker'];

    return (
       <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-2)',
        }}
      >
        <Paragraph>Vis data for</Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
          {options.map((grade) => (
            <Chip.Radio name='my-radio' aria-label={grade}>
              {grade}
            </Chip.Radio>
          ))}
        </div>
      </div>
    );
  }
};

export const Removable: Story = {
  render: (_args) => {
    const mapOptions = ['Sjøkart', 'Dybder', 'Sjømerker'];
    const [filter, setFilter] = useState(mapOptions);

    return (
      <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
        {filter.map((item) => (
          <Chip.Removable
            key={item}
            aria-label={`Slett ${item}`}
            onClick={() => {
              setFilter((x) =>
                x.length === 1 ? mapOptions : x.filter((y) => y !== item),
              );
            }}
          >
            {item}
          </Chip.Removable>
        ))}
      </div>
    );
  }
};
