import { Table } from '../../components/table/Table';

const cookies = [
  { 
    name: '*Samtykke-cookie*', 
    purpose: 'Adminstrasjon av samtykke', 
    optionality: 'Valgfri', 
    storageTime: '90 dager', 
    recipient: 'Kartverket'
  },
  { 
    name: 'Datacelle', 
    purpose: 'Datacelle', 
    optionality: 'Datacelle', 
    storageTime: 'Datacelle', 
    recipient: 'Datacelle'
  },

]

export function CookiesTable() {
  return(
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell scope='col'>Navn</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Formål</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Valgfrihet</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Lagringstid*</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Mottaker</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {cookies.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.purpose}</Table.Cell>
            <Table.Cell>{row.optionality}</Table.Cell>
            <Table.Cell>{row.storageTime}</Table.Cell>
            <Table.Cell>{row.recipient}</Table.Cell>
          </Table.Row>
        ))}    
      </Table.Body>
    </Table>
  )
};
