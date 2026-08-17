import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Table, TableHeaderCellProps } from './Table';
import { Tag } from '../tag/Tag';
import { Pagination } from '../pagination/Pagination';
import { usePagination } from '../../utilities/hooks/usePagination/usePagination';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button } from '../button/Button';

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (_args) => (
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
  )
};

const zebraData = [
  { month: 'Januar', y2023: '1 230', y2024: '1 450' },
  { month: 'Februar', y2023: '980', y2024: '1 120' },
  { month: 'Mars', y2023: '1 150', y2024: '1 300' },
  { month: 'April', y2023: '950', y2024: '1 100' },
  { month: 'Mai', y2023: '1 420', y2024: '1 670' },
]

export const ZebraStripes: Story = {
  render: (_args) => (
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
          <Table.HeaderCell>Måned</Table.HeaderCell>
          <Table.HeaderCell style={{ textAlign: 'right' }}>
            2023
          </Table.HeaderCell>
          <Table.HeaderCell style={{ textAlign: 'right' }}>
            2024
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {zebraData.map(({ month, y2023, y2024 }) => (
          <Table.Row>
            <Table.HeaderCell scope='row'>{month}</Table.HeaderCell>
            <Table.Cell style={{ textAlign: 'right' }}>{y2023}</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>{y2024}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
};

const dummyData = [
  {
    id: 1,
    navn: 'Lise Nordmann',
    epost: 'lise@nordmann.no',
    telefon: '22345678',
    status: 'I arbeid',
  },
  {
    id: 2,
    navn: 'Kari Nordmann',
    epost: 'kari@nordmann.no',
    telefon: '87654321',
    status: 'Ferdig',
  },
  {
    id: 3,
    navn: 'Ola Nordmann',
    epost: 'ola@nordmann.no',
    telefon: '32345678',
    status: 'I arbeid',
  },
  {
    id: 4,
    navn: 'Per Nordmann',
    epost: 'per@nordmann.no',
    telefon: '12345678',
    status: 'Ikke begynt',
  },
];

function tagColor(status: string) {
  switch (status) {
    case 'Ikke begynt':
      return 'warning';
    case 'I arbeid':
      return 'info';
    case 'Ferdig':
      return 'success';
    default:
      return 'info';
  }
};

export const WithBorder: Story = {
  render: (_args) => (
    <Table border>
      <caption>Søknader til tinglysing</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Navn</Table.HeaderCell>
          <Table.HeaderCell>E-Post</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {dummyData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.navn}</Table.Cell>
            <Table.Cell>{row.epost}</Table.Cell>
            <Table.Cell>
              <Tag data-color={tagColor(row.status)}>{row.status}</Tag>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
};

export const Sortable: Story = {
  render: () => {
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
            <Table.HeaderCell>Rediger</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.navn}</Table.Cell>
              <Table.Cell>{row.epost}</Table.Cell>
              <Table.Cell>{row.telefon}</Table.Cell>
              <Table.Cell>
                <Button variant='tertiary' aria-label='Rediger rad'>
                  <PencilIcon aria-hidden />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
};

const dummyDataFylke = [
  {
    id: 1,
    fylke: 'Agder',
    kommuner: '25',
  },
  {
    id: 2,
    fylke: 'Akershus',
    kommuner: '21',
  },
  {
    id: 3,
    fylke: 'Buskerud',
    kommuner: '18',
  },
  {
    id: 4,
    fylke: 'Finnmark',
    kommuner: '18',
  },
  {
    id: 5,
    fylke: 'Innlandet',
    kommuner: '46',
  },
  {
    id: 6,
    fylke: 'Møre og Romsdal',
    kommuner: '26',
  },
  {
    id: 7,
    fylke: 'Nordland',
    kommuner: '41',
  },
  {
    id: 8,
    fylke: 'Oslo',
    kommuner: '1',
  },
  {
    id: 9,
    fylke: 'Rogaland',
    kommuner: '23',
  },
  {
    id: 10,
    fylke: 'Telemark',
    kommuner: '17',
  },
  {
    id: 11,
    fylke: 'Troms',
    kommuner: '21',
  },
  {
    id: 12,
    fylke: 'Trøndelag',
    kommuner: '38',
  },
  {
    id: 13,
    fylke: 'Vestfold',
    kommuner: '6',
  },
  {
    id: 14,
    fylke: 'Vestland',
    kommuner: '43',
  },
  {
    id: 15,
    fylke: 'Østfold',
    kommuner: '12',
  },
];

const storyParams = { docs: { source: { type: 'code' } } };

export const FixedTable: Story = {
  parameters: storyParams,
  args: {
    style: {
      tableLayout: 'fixed',
      fontVariantNumeric: 'tabular-nums',
      marginBottom: 'var(--ds-size-3)',
    }
  },
  render: (args) => {
    const [page, setCurrentPage] = useState(1);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages: 3,
      showPages: 3,
      setCurrentPage: (page) => {
        setCurrentPage(page);
      },
    });
    const itemsPerPage = 5;

    // Calculate the start and end index for slicing the data
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dummyDataFylke.slice(
      indexOfFirstItem,
      indexOfLastItem,
    );

    return (
      <>
        <Table {...args}>
          <caption>Antall kommuner per fylke</caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Fylke</Table.HeaderCell>
              <Table.HeaderCell>Kommuner</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {currentItems.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.fylke}</Table.Cell>
                <Table.Cell>{item.kommuner}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination>
          <Pagination.List>
            <Pagination.Item>
              <Pagination.Button aria-label='Forrige side' {...prevButtonProps}>
                Forrige
              </Pagination.Button>
            </Pagination.Item>
            {pages.map(({ page, itemKey, buttonProps }) => (
              <Pagination.Item key={itemKey}>
                {typeof page === 'number' && (
                  <Pagination.Button
                    aria-label={`Side ${page}`}
                    {...buttonProps}
                  >
                    {page}
                  </Pagination.Button>
                )}
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Button aria-label='Neste side' {...nextButtonProps}>
                Neste
              </Pagination.Button>
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
      </>
    );
  }
};

export const Numbers: Story = {
  render: (_args) => (
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
