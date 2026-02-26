import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableHeaderCellProps } from './Table';
import { useState } from 'react';

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <Table>
      <caption>Table caption</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Header 1</Table.HeaderCell>
          <Table.HeaderCell>Header 2</Table.HeaderCell>
          <Table.HeaderCell>Header 3</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell 4</Table.Cell>
          <Table.Cell>Cell 5</Table.Cell>
          <Table.Cell>Cell 6</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Foot>
        <Table.Row>
          <Table.HeaderCell>Footer 1</Table.HeaderCell>
          <Table.HeaderCell>Footer 2</Table.HeaderCell>
          <Table.HeaderCell>Footer 3</Table.HeaderCell>
        </Table.Row>
      </Table.Foot>
    </Table>
  ),
};

export const ZebraStripes: Story = {
  render: () => (
    <Table 
      zebra
      style={{
        tableLayout: 'fixed',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <caption>Antall søknader per måned</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell scope='col'>Måned</Table.HeaderCell>
          <Table.HeaderCell scope='col' style={{ textAlign: 'right' }}>
            2023
          </Table.HeaderCell>
          <Table.HeaderCell scope='col' style={{ textAlign: 'right' }}>
            2024
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell scope='row'>Januar</Table.HeaderCell>
          <Table.Cell style={{ textAlign: 'right' }}>1 230</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>1 450</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row'>Februar</Table.HeaderCell>
          <Table.Cell style={{ textAlign: 'right' }}>980</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>1 120</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row'>Mars</Table.HeaderCell>
          <Table.Cell style={{ textAlign: 'right' }}>1 150</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>1 300</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
};

export const WithBorder: Story = {
  render: () => (
    <Table border >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>
            Navn
          </Table.HeaderCell>
          <Table.HeaderCell>
            Rolle
          </Table.HeaderCell>
          <Table.HeaderCell>
            Epost
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            Rita Nordmann
          </Table.Cell>
          <Table.Cell>
            Rektor
          </Table.Cell>
          <Table.Cell>
            rita@nordmann.no
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Kari Nordmann
          </Table.Cell>
          <Table.Cell>
            Lektor
          </Table.Cell>
          <Table.Cell>
            kari@nordmann.no
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Ola Nordmann
          </Table.Cell>
          <Table.Cell>
            Lektor
          </Table.Cell>
          <Table.Cell>
            ola@nordmann.no
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Kai Nordmann
          </Table.Cell>
          <Table.Cell>
            Lektor
          </Table.Cell>
          <Table.Cell>
            kai@nordmann.no
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Mateo Nordmann
          </Table.Cell>
          <Table.Cell>
            Ass. rektor
          </Table.Cell>
          <Table.Cell>
            mateo@nordmann.no
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
};

export const Sortable: Story = {
  render: () => {
    const dummyData = [
      {
        id: 1,
        navn: 'Lise Nordmann',
        epost: 'lise@nordmann.no',
        telefon: '22345678',
      },
      {
        id: 2,
        navn: 'Kari Nordmann',
        epost: 'kari@nordmann.no',
        telefon: '87654321',
      },
      {
        id: 3,
        navn: 'Ola Nordmann',
        epost: 'ola@nordmann.no',
        telefon: '32345678',
      },
      {
        id: 4,
        navn: 'Per Nordmann',
        epost: 'per@nordmann.no',
        telefon: '12345678',
      },
    ];

    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);

    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps['sort']>(undefined);

    const handleSort = (field: keyof (typeof dummyData)[0]) => {
      if (sortField === field && sortDirection === 'descending') {
        setSortField(null);
        setSortDirection(undefined);
      } else {
        setSortField(field);
        setSortDirection(
          sortField === field && sortDirection === 'ascending'
            ? 'descending'
            : 'ascending',
        );
      }
    };

    const sortedData = [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField])
        return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    });

    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              sort={sortField === 'navn' ? sortDirection : 'none'}
              onClick={() => handleSort('navn')}
            >
              Navn
            </Table.HeaderCell>
            <Table.HeaderCell>Epost</Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'telefon' ? sortDirection : 'none'}
              onClick={() => handleSort('telefon')}
            >
              Telefon
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.navn}</Table.Cell>
              <Table.Cell>{row.epost}</Table.Cell>
              <Table.Cell>{row.telefon}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const FixedTable: Story = {
  render: () => {
    const rows = Array.from({ length: 3 }, (_, i) => i + 1);
    return (
      <Table
        style={{
          tableLayout: 'fixed',
        }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell>Header 2</Table.HeaderCell>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row}>
              <Table.Cell>{`Cell ${row}1`}</Table.Cell>
              <Table.Cell>{`Cell ${row}2`}</Table.Cell>
              <Table.Cell>{`Cell ${row}3`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
};

export const Numbers: Story = {
  render: () => (
    <Table
      style={{
        tableLayout: 'fixed',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <caption>Antall søknader per måned</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell scope='col'>Måned</Table.HeaderCell>
          <Table.HeaderCell scope='col' style={{ textAlign: 'right' }}>
            2023
          </Table.HeaderCell>
          <Table.HeaderCell scope='col' style={{ textAlign: 'right' }}>
            2024
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell scope='row'>Januar</Table.HeaderCell>
          <Table.Cell style={{ textAlign: 'right' }}>1 230</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>1 450</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row'>Februar</Table.HeaderCell>
          <Table.Cell style={{ textAlign: 'right' }}>980</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>1 120</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope='row'>Mars</Table.HeaderCell>
          <Table.Cell style={{ textAlign: 'right' }}>1 150</Table.Cell>
          <Table.Cell style={{ textAlign: 'right' }}>1 300</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
};