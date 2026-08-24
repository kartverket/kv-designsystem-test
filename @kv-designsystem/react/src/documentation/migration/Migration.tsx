import { Table } from '../../components/table/Table';
 
/**
 * Migreringsguide fra KVIB til vårt nye designsystem.
 *
 * `shared`      = identisk i KVIB v4 og v5+ → vises i begge tabeller.
 * `legacyOnly`  = kun v4/eldre, + v4-siden av komponenter som ble døpt om/endret.
 * `modernOnly`  = kun v5+,      + v5-siden av de samme.
 * `newDs`       = DS-komponenter uten KVIB-ekvivalent.
 *
 */
 
type Row = { kvib: string; ds: string; note?: string };
 
const shared: Row[] = [
  { kvib: 'Alert', ds: 'Alert', note: 'Færre varianter. Ikon settes automatisk basert på status. Vurder Error summary for oppsummering av flere feil.' },
  { kvib: 'Badge', ds: 'Tag', note: 'DS Tag er et ikke-interaktivt kategorimerke. (DS Badge er for status/tall — erstatter bl.a. KVIB sin Status-komponent.)' },
  { kvib: 'Breadcrumb', ds: 'Breadcrumbs' },
  { kvib: 'Button', ds: 'Button', note: 'Varianter mappes til primary(default) / secondary / tertiary.' },
  { kvib: 'Card', ds: 'Card', note: '<CardHeader>, <CardBody>, <CardFooter> finnes ikke lenger. Del heller inn i seksjoner med <Card.Block>.' },
  { kvib: 'CloseButton', ds: '—', note: 'Ingen egen. Følger by default med i Dialog. Bruk ellers <Button variant="tertiary" data-color="neutral"> med aria-label og @navikt/aksel-icons sitt XMarkIcon.' },
  { kvib: 'Code', ds: '—', note: 'Ingen egen. Bruk <code>/<pre> med css-variabler.' },
  { kvib: 'Drawer', ds: 'Dialog', note: 'Dialog med placement="top/right/bottom/left" gir tilnærmet lik funksjonalitet.' },
  { kvib: 'Editable', ds: '—', note: 'Ingen erstatning.' },
  { kvib: 'Heading', ds: 'Heading', note: 'Skill semantisk nivå (level) fra visuell størrelse (data-size) — de er uavhengige.' },
  { kvib: 'Icon', ds: '—', note: 'Ingen egen. Bruk @navikt/aksel-icons eller OpenBridge-ikoner.' },
  { kvib: 'IconButton', ds: 'Button', note: 'DS Button støtter ikon-only. Husk aria-label for tilgjengelighet.' },
  { kvib: 'Image', ds: '—', note: 'Ingen egen. Bruk <img>.' },
  { kvib: 'Input', ds: 'Textfield / Input', note: 'Ble Input i praksis brukt som label + felt? Da er Textfield riktig. Input er kun det rå feltet.' },
  { kvib: 'Kbd', ds: '—', note: 'Ingen egen. Bruk <kbd>.' },
  { kvib: 'Link', ds: 'Link' },
  { kvib: 'LinkOverlay', ds: 'Card (Lenkekort)', note: 'Se under Lenkekort i Card-dokumentasjonen.' },
  { kvib: 'Menu', ds: 'Dropdown' },
  { kvib: 'NumberInput', ds: 'Textfield / Input', note: 'Ingen egen tallkomponent. Bruk type="number".' },
  { kvib: 'Pagination', ds: 'Pagination', note: 'Bruk sammen med usePagination-hooken.' },
  { kvib: 'PinInput', ds: '—', note: 'Ingen direkte erstatning.' },
  { kvib: 'Popover', ds: 'Popover', note: 'Legg i en Popover.TriggerContext med en Popover.Trigger, eller bruk <Button popovertarget="[popover-id]">.' },
  { kvib: 'Portal', ds: '—', note: 'Ingen egen. Bruk React sin createPortal.' },
  { kvib: 'Progress', ds: '—', note: 'Foreløpig ingen erstatning.' },
  { kvib: 'Select', ds: 'Select / Suggestion', note: 'Enkelt valg → Select. Søkbar eller fler-valg → Suggestion (med List/Option/Empty).' },
  { kvib: 'Skeleton', ds: 'Skeleton' },
  { kvib: 'SkipNav', ds: 'Skip link' },
  { kvib: 'Slider', ds: '—', note: 'Foreløpig ingen erstatning.' },
  { kvib: 'Spinner', ds: 'Spinner', note: 'Krever nå aria-label — en fin tvang for økt tilgjengelighet.' },
  { kvib: 'Stat', ds: '—', note: 'Ingen erstatning.' },
  { kvib: 'Status', ds: 'Badge', note: 'For tall: <Badge count="[antall]">. For status: wrap Badge + statustekst i en flexbox.' },
  { kvib: 'Switch', ds: 'Switch' },
  { kvib: 'Tabs', ds: 'Tabs', note: 'Tabs.List med Tabs.Tab for tabene og Tabs.Panel for hvert panel.' },
  { kvib: 'Tag', ds: 'Tag / Chip', note: 'Statisk merke → Tag. Interaktivt filter (velg/fjern) → Chip.' },
  { kvib: 'Text', ds: 'Paragraph' },
  { kvib: 'Toast', ds: '—', note: 'Designsystemet tilbyr bevisst ikke en toast-komponent (kjente tilgjengelighetsproblemer). Vurder Alert eller Dialog i stedet.' },
  { kvib: 'Tooltip', ds: 'Tooltip' },
];
 
const legacyOnly: Row[] = [
  { kvib: 'Accordion', ds: 'Details', note: 'Ikke 1-til-1. Bygger på native <details>. Ingen allowMultiple — bør ikke nøstes. Regn med litt omskriving.' },
  { kvib: 'AlertDialog', ds: 'Dialog', note: 'Slått sammen med Modal. Vurder om innholdet heller bør være en Alert.' },
  { kvib: 'Avatar', ds: 'Avatar' },
  { kvib: 'AvatarGroup', ds: 'Avatar stack' },
  { kvib: 'Box', ds: '—', note: 'Ingen direkte erstatning. Bruk <div> med --ds-variabler.' },
  { kvib: 'Checkbox', ds: 'Checkbox', note: 'Grupper styres med Fieldset + useCheckboxGroup i stedet for FormControl.' },
  { kvib: 'Divider', ds: 'Divider', note: 'NB: samme navn, men i KVIB v5+ heter denne Separator.' },
  { kvib: 'FormControl', ds: 'Field', note: 'FormControl-mønsteret er delt opp: Field grupperer, Label merker, Validation message viser feil, hjelpetekst via Field.Description.' },
  { kvib: 'FormLabel', ds: 'Label' },
  { kvib: 'FormErrorMessage', ds: 'Validation message', note: 'Koble feilmeldingen til feltet via Field, ikke bare vis den ved siden av.' },
  { kvib: 'FormHelperText', ds: 'Field.Description' },
  { kvib: 'HStack / VStack / Stack', ds: '— (Flex/Grid kommer)', note: 'Ingen layout-primitiver ennå. Lag gjenbrukbare Flex-/Grid-wrappere med gap fra --ds-size-variabler.' },
  { kvib: 'Modal (m/underkomponenter)', ds: 'Dialog + Dialog.Block', note: 'Bygger på native <dialog>. ModalBody/Header/Footer erstattes av Dialog med Dialog.Block. Vurder om innholdet heller bør være en Alert.' },
  { kvib: 'OrderedList / UnorderedList', ds: 'List.Ordered / List.Unordered', note: 'Slått sammen til List.' },
  { kvib: 'Radio + RadioGroup', ds: 'Radio + useRadioGroup', note: 'Bruk useRadioGroup-hooken sammen med Fieldset/Legend.' },
  { kvib: 'Segmented control', ds: 'Toggle group', note: 'Gruppe sammenhengende knapper med ett aktivt valg.' },
  { kvib: 'Stepper', ds: '—', note: 'Foreløpig ingen erstatning.' },
  { kvib: 'Table + Thead/Tbody/Tr/Th/Td', ds: 'Table + Table.Head/.Body/.Row/.HeaderCell/.Cell', note: 'Underkomponentene får punktnotasjon. Legg til <caption> for tabelloverskrift (økt tilgjengelighet).' },
  { kvib: 'Textarea', ds: 'Textarea' },
  { kvib: 'Wrap', ds: '—', note: 'Ingen egen. Bruk en wrapper med flex-wrap.' },
];
 
const modernOnly: Row[] = [
  { kvib: 'Accordion', ds: 'Details', note: 'Ikke 1-til-1. Bygger på native <details>. Ingen multiple — bør ikke nøstes. Regn med litt omskriving.' },
  { kvib: 'Action Bar', ds: '—', note: 'Ingen erstatning.' },
  { kvib: 'Avatar', ds: 'Avatar', note: 'Bruk Avatar stack for grupper.' },
  { kvib: 'Checkbox', ds: 'Checkbox', note: 'Grupper styres med Fieldset + useCheckboxGroup.' },
  { kvib: 'Checkbox Card', ds: 'Checkbox', note: 'Ingen direkte erstatning. Bruk <Checkbox variant="outline">.' },
  { kvib: 'Clipboard', ds: '—', note: 'Foreløpig ingen erstatning. Bygg med <Button icon>.' },
  { kvib: 'Collapsible', ds: 'Details', note: 'Bruk Details i stedet.' },
  { kvib: 'Color Picker', ds: '—', note: 'Ingen direkte erstatning. Bygg med Input/Textfield med type="color".' },
  { kvib: 'Color Swatch', ds: '—', note: 'Ingen erstatning.' },
  { kvib: 'Data List', ds: '—', note: 'Foreløpig ingen erstatning.' },
  { kvib: 'Datepicker', ds: 'Input / Textfield type="date"', note: 'DS tilbyr foreløpig ikke en datovelger — et bevisst valg, fordi en kalender ikke alltid er den beste løsningen for å oppgi en dato.' },
  { kvib: 'Dialog', ds: 'Dialog + Dialog.Block', note: 'Bygger på native <dialog>. Innhold deles i seksjoner med Dialog.Block. Vurder om innholdet heller bør være en Alert.' },
  { kvib: 'Empty State', ds: '—', note: 'Ingen egen. Komponér selv (Heading + Paragraph + evt. Button).' },
  { kvib: 'Field', ds: 'Field', note: 'Field grupperer, Label merker, Validation message viser feil, hjelpetekst via Field.Description.' },
  { kvib: 'Fieldset', ds: 'Fieldset' },
  { kvib: 'FileUpload', ds: 'File upload' },
  { kvib: 'Footer', ds: 'Footer' },
  { kvib: 'Header', ds: 'Header' },
  { kvib: 'Highlight', ds: '—', note: 'Ingen egen. For relevans (f.eks. søketreff) er <mark> riktig; for rent visuell utheving, bruk <span> med CSS.' },
  { kvib: 'HoverCard', ds: 'Popover', note: 'Popover er nærmeste treff, men det anbefales ikke å utløse popover ved hover. For enkel hjelpetekst: Tooltip.' },
  { kvib: 'List', ds: 'List', note: 'Bruk List.Ordered / List.Unordered i stedet for as="ol"/"ul".' },
  { kvib: 'Logo', ds: 'Logo' },
  { kvib: 'Password Input', ds: 'Textfield / Input', note: 'Ingen egen. Bruk type="password".' },
  { kvib: 'Progress Circle', ds: '—', note: 'Foreløpig ingen erstatning.' },
  { kvib: 'Radio', ds: 'Radio', note: 'Bruk useRadioGroup-hooken sammen med Fieldset/Legend.' },
  { kvib: 'Radio Card', ds: 'Radio', note: 'Ingen direkte erstatning. Bruk <Radio variant="outline">.' },
  { kvib: 'Rating', ds: '—', note: 'Ingen erstatning.' },
  { kvib: 'Search', ds: 'Search' },
  { kvib: 'SearchAsync', ds: 'Suggestion / Search', note: 'Søkbar/asynkron liste med treff → Suggestion. Ren søkeboks → Search.' },
  { kvib: 'Select (Native)', ds: 'Select', note: 'DS Select er native-basert.' },
  { kvib: 'Separator', ds: 'Divider', note: 'Het Divider i KVIB v4 og eldre.' },
  { kvib: 'Show', ds: '—', note: 'Ingen egen. Bruk betinget rendering i React.' },
  { kvib: 'Stepper (Steps)', ds: '—', note: 'Foreløpig ingen erstatning.' },
  { kvib: 'Table', ds: 'Table + Table.Head/.Body/.Row/.HeaderCell/.Cell', note: 'Underkomponentene får punktnotasjon. Legg til <caption> for tabelloverskrift (økt tilgjengelighet).' },
  { kvib: 'Text Area', ds: 'Textarea' },
  { kvib: 'Timeline', ds: '—', note: 'Ingen erstatning.' },
  { kvib: 'Timepicker', ds: 'Input / Textfield', note: 'Bruk type="time".' },
  { kvib: 'Toggle Tip', ds: 'Tooltip / Popover', note: 'Klikkbar hjelpetekst → Popover. Enkel hover-tekst → Tooltip.' },
];
 
const newComponents: Row[] = [
  { kvib: '—', ds: 'Chip', note: 'Små, interaktive filter-elementer (velg/fjern). For å filtrere lister/søk og vise aktive filter. Ikke Tag (statisk merke) eller Badge (status/tall).' },
  { kvib: '—', ds: 'Error summary', note: 'Oppsummering av skjemafeil øverst i skjema/trinn. Hver feil er en lenke (href til felt-id) som hopper til feltet. Håndterer fokus og aria automatisk.' },
];

function MigrationTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return (
    <Table zebra>
      <caption>{caption}</caption>
      <Table.Head>
        <Table.Row>
          {headers.map((h) => (
            <Table.HeaderCell key={h} scope='col'>{h}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((cells) => (
          <Table.Row key={cells[0]}>
            {cells.map((cell, i) => (
              <Table.Cell key={i}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
 
export function MigrationGuide() {
  return (
    <>
      <MigrationTable
        caption='Migrering fra KVIB v4 og eldre til det nye designsystemet'
        headers={['KVIB-komponentnavn (< v5)', 'Nytt komponentnavn', 'Tilleggsinformasjon']}
        rows={[...shared, ...legacyOnly]
          .sort((a, b) => (a.kvib > b.kvib ? 1 : -1))
          .map((row) => [row.kvib, row.ds, row.note ?? ''])}
      />
      <MigrationTable
        caption='Migrering fra KVIB v5 og nyere til det nye designsystemet'
        headers={['KVIB-komponentnavn (v5+)', 'Nytt komponentnavn', 'Tilleggsinformasjon']}
        rows={[...shared, ...modernOnly]
          .sort((a, b) => (a.kvib > b.kvib ? 1 : -1))
          .map((row) => [row.kvib, row.ds, row.note ?? ''])}
      />
      <MigrationTable
        caption='Nytt i det nye designsystemet — uten KVIB-ekvivalent'
        headers={['KVIB-komponentnavn', 'Nytt komponentnavn', 'Beskrivelse / når du bruker den']}
        rows={[...newComponents]
          .sort((a, b) => (a.kvib > b.kvib ? 1 : -1))
          .map((row) => [row.kvib, row.ds, row.note ?? ''])}
      />
    </>
  );
}
 