import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from './Search';
import { Divider } from '../divider/Divider';
import { Spinner } from '../spinner/Spinner';
import { useState, useEffect } from 'react';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';

const meta = {
  component: Search,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <Search>
      <Search.Input aria-label='Søk' />
      <Search.Clear />
      <Search.Button />
    </Search>
  ),
};

export const Variants: Story = {
  render: () => (
    <div>
      <Search>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
      </Search>

      <Divider style={{
      marginTop: 'var(--ds-size-4)'
    }} />

      <Search>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
        <Search.Button />
      </Search>

      <Divider style={{
      marginTop: 'var(--ds-size-4)'
    }} />

      <Search>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
        <Search.Button variant="secondary" />
      </Search>
    </div>
  )
};

export const LiveSearch: Story = {
  parameters: {
    docs: { source: { type: 'code' } },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-2)',
        }}
      >
        <Story />
      </div>
    ),
  ],

  render: (args) => {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    // Debounce logic
    useEffect(() => {
      if (!value) {
        setSearchValue('');
        return;
      }

      const timeout = setTimeout(() => {
        setSearchValue(value);
      }, 500);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <>
        <Search {...args}>
          <Search.Input
            aria-label="Søk"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Search.Clear />
        </Search>

        {searchValue !== '' && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-1)',
              alignItems: 'center',
            }}
          >
            <Spinner aria-hidden data-size="xs" />
            <span>Søker etter: {searchValue}</span>
          </div>
        )}
      </>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <Field>
      <Label>Søk etter datasett</Label>
      <Search>
        <Search.Input name='dataset-search' />
        <Search.Clear />
        <Search.Button />
      </Search>
    </Field>
  )
}

