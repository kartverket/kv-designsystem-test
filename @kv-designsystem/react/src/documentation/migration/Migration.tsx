import { Table } from '../../components/table/Table';

const translations = [
  { kvib: 'Accordion', ds: 'Details' },
  { kvib: 'Badge', ds: 'Tag' },
  { kvib: 'Dialog (modal)', ds: 'Dialog' },
  { kvib: 'Heading', ds: 'Typography/Heading' },
  { kvib: 'Input*', ds: 'Textfield*' },
  { kvib: 'Menu', ds: 'Dropdown' },
  { kvib: 'Segmented control', ds: 'ToggleGroup' },
  { kvib: 'Separator', ds: 'Divider' },
  { kvib: 'Status', ds: 'Badge' },
  { kvib: 'Text', ds: 'Typography/Paragraph' },  
]

export function TranslationTable() {
  return(
    <Table zebra>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell scope='col'>KVIB komponent-navn</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Kartverkets designsystem komponent-navn</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {translations.map((row) => (
          <Table.Row key={row.kvib}>
            <Table.Cell>{row.kvib}</Table.Cell>
            <Table.Cell>{row.ds}</Table.Cell>
        </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
};
