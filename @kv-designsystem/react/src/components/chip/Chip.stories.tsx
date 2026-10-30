import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import { subcomponents } from './docs/subcomponents';
import { useState } from 'react';
import { Search } from '../search/Search';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Grid } from '../layout/Grid';
import { Flex } from '../layout/Flex';

const meta = {
  component: Chip.Radio,
  subcomponents,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <Grid>
        <Story />
      </Grid>
    ),
  ],
} satisfies Meta<typeof Chip.Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Chip',
  },
};

export const Button: Story = {
  render: (_args) => {
    const [inputValue, setInputValue] = useState('');

    return (
      <Grid gap={2}>
        <Search>
          <Search.Input
            aria-label="søk"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Search.Clear />
          <Search.Button type="submit" />
        </Search>
        <Flex gap={2} alignItems="baseline">
          <Paragraph>Hurtigsøk: </Paragraph>
          <Chip.Button onClick={() => setInputValue('Høydedata')}>Høydedata</Chip.Button>
          <Chip.Button onClick={() => setInputValue('Terrengmodell')}>Terrengmodell</Chip.Button>
          <Chip.Button onClick={() => setInputValue('Laserdata')}>Laserdata</Chip.Button>
        </Flex>
      </Grid>
    );
  },
};

export const Checkbox: Story = {
  render: (_args) => {
    const options = ['2020', '2021', '2022', '2023', '2024', '2025'];

    return (
      <Grid gap={2}>
        <Paragraph>Vis data for</Paragraph>
        <Flex gap={2}>
          {options.map((year) => (
            <Chip.Checkbox key={year} aria-label={year}>
              {year}
            </Chip.Checkbox>
          ))}
        </Flex>
      </Grid>
    );
  },
};

export const Radio: Story = {
  render: (_args) => {
    const options = ['Sjøkart', 'Dybder', 'Sjømerker'];

    return (
      <Grid gap={2}>
        <Paragraph>Vis data for</Paragraph>
        <Flex gap={2}>
          {options.map((grade) => (
            <Chip.Radio name="my-radio" aria-label={grade}>
              {grade}
            </Chip.Radio>
          ))}
        </Flex>
      </Grid>
    );
  },
};

export const Removable: Story = {
  render: (_args) => {
    const mapOptions = ['Sjøkart', 'Dybder', 'Sjømerker'];
    const [filter, setFilter] = useState(mapOptions);

    return (
      <Flex gap={2}>
        {filter.map((item) => (
          <Chip.Removable
            key={item}
            aria-label={`Slett ${item}`}
            onClick={() => {
              setFilter((x) => (x.length === 1 ? mapOptions : x.filter((y) => y !== item)));
            }}
          >
            {item}
          </Chip.Removable>
        ))}
      </Flex>
    );
  },
};
