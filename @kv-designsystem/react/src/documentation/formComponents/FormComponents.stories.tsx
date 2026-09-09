// Storybook 10 · CSF3
// Bytt '@storybook/react-vite' til deres framework-pakke ved behov
// (f.eks. '@storybook/nextjs-vite'). Bytt '@digdir/designsystemet-react'
// til deres pakkenavn (kv-designsystem) — komponentene er identiske.
//
// Hver story rendrer en ekte komponent, men koden som vises i «Show code»
// overstyres med parameters.docs.source.code, slik at konsumenten ser hele
// den kopierbare koden (imports + state), ikke bare `() => <Komponent />`.
// Kildestrengene speiler komponentene under — hold dem i sync ved endringer.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  Input,
  Textarea,
  Textfield,
  Field,
  Label,
  Select,
  ValidationMessage,
  Fieldset,
  Radio,
  Button,
  ErrorSummary,
  Table,
} from '@digdir/designsystemet-react';

/* -------------------------------------------------------------------------- */
/* Delte hjelpere                                                             */
/* -------------------------------------------------------------------------- */

function validateEmail(value: string): string | undefined {
  if (!value) return 'E-post er påkrevd';
  if (!value.includes('@')) return 'Ugyldig e-postadresse';
  return undefined;
}

type Errors = Record<string, string>;

/* -------------------------------------------------------------------------- */
/* Komponenter som rendres i storiene                                         */
/* -------------------------------------------------------------------------- */

function InlineEditTable() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell id='col-antall'>Antall</Table.HeaderCell>
          <Table.HeaderCell id='col-pris'>Pris</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Input type='number' aria-labelledby='col-antall' defaultValue={1} />
          </Table.Cell>
          <Table.Cell>
            <Input type='number' aria-labelledby='col-pris' defaultValue={0} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

function TextfieldExamples() {
  return (
    <div style={{ display: 'grid', gap: 'var(--ds-size-4)', maxWidth: '20rem' }}>
      <Textfield label='Fornavn' name='firstName' />
      <Textfield
        label='E-post'
        description='Vi sender kvittering hit'
        type='email'
        name='email'
        error='Ugyldig e-postadresse'
      />
      <Textfield label='Kommentar' multiline counter={200} />
      <Textfield label='Beløp i kroner' type='number' suffix='kr' />
    </div>
  );
}

function LastNameField() {
  const [value, setValue] = useState('Nordmann Svenske');
  const error = value.includes(' ') ? 'Kan ikke inneholde mellomrom' : undefined;

  return (
    <Field>
      <Label>Etternavn</Label>
      <Field.Description>Kan ikke inneholde mellomrom</Field.Description>
      <Input
        name='lastName'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
}

function CountyField() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const error = touched && !value ? 'Du må velge et fylke' : undefined;

  return (
    <Field>
      <Label>Fylke</Label>
      <Select
        name='county'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={!!error}
      >
        <Select.Option value=''>Velg…</Select.Option>
        <Select.Option value='03'>Oslo</Select.Option>
        <Select.Option value='11'>Rogaland</Select.Option>
      </Select>
      {error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
}

function ContactMethodGroup() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const error = submitted && !value ? 'Du må velge et alternativ' : undefined;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Fieldset>
        <Fieldset.Legend>Hvordan vil du bli kontaktet?</Fieldset.Legend>
        <Fieldset.Description>Velg ett alternativ</Fieldset.Description>
        <Radio
          label='E-post'
          name='contact'
          value='email'
          checked={value === 'email'}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label='SMS'
          name='contact'
          value='sms'
          checked={value === 'sms'}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label='Post'
          name='contact'
          value='post'
          checked={value === 'post'}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && <ValidationMessage>{error}</ValidationMessage>}
      </Fieldset>
      <Button type='submit' style={{ marginTop: 'var(--ds-size-4)' }}>
        Send
      </Button>
    </form>
  );
}

function AddressFieldset() {
  return (
    <Fieldset>
      <Fieldset.Legend>Adresse</Fieldset.Legend>
      <Textfield label='Gateadresse' name='street' />
      <Textfield label='Postnummer' name='zip' size={4} />
      <Textfield label='Poststed' name='city' />
    </Fieldset>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};

    const name = String(data.get('name') ?? '');
    if (!name) next.name = 'Navn er påkrevd';

    const emailError = validateEmail(String(data.get('email') ?? ''));
    if (emailError) next.email = emailError;

    setErrors(next);

    if (Object.keys(next).length === 0) {
      // send skjemaet
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: 'grid', gap: 'var(--ds-size-4)', maxWidth: '24rem' }}
    >
      {Object.keys(errors).length > 0 && (
        <ErrorSummary>
          <ErrorSummary.Heading>
            For å gå videre må du rette opp følgende:
          </ErrorSummary.Heading>
          <ErrorSummary.List>
            {Object.entries(errors).map(([field, message]) => (
              <ErrorSummary.Item key={field}>
                <ErrorSummary.Link href={'#' + field}>{message}</ErrorSummary.Link>
              </ErrorSummary.Item>
            ))}
          </ErrorSummary.List>
        </ErrorSummary>
      )}

      <Textfield label='Navn' name='name' id='name' error={errors.name} />
      <Textfield
        label='E-post'
        name='email'
        id='email'
        type='email'
        error={errors.email}
      />
      <Button type='submit'>Send</Button>
    </form>
  );
}

function EmailFieldLive() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    setError(validateEmail(next));
  }

  return (
    <Textfield
      label='E-post'
      type='email'
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
}

function EmailFieldTouched() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    if (touched) setError(validateEmail(next));
  }

  function handleBlur() {
    setTouched(true);
    setError(validateEmail(value));
  }

  return (
    <Textfield
      label='E-post'
      type='email'
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched ? error : undefined}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Kildekode vist i «Show code» (full, kopierbar kode inkl. imports)          */
/* -------------------------------------------------------------------------- */

const inputSource = `import { Input, Table } from '@digdir/designsystemet-react';

// Kolonneoverskriften er label, så cellene trenger ingen egen synlig <label>.
// Input kobles til overskriften med aria-labelledby.
function InlineEditTable() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell id='col-antall'>Antall</Table.HeaderCell>
          <Table.HeaderCell id='col-pris'>Pris</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Input type='number' aria-labelledby='col-antall' defaultValue={1} />
          </Table.Cell>
          <Table.Cell>
            <Input type='number' aria-labelledby='col-pris' defaultValue={0} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}`;

const textfieldSource = `import { Textfield } from '@digdir/designsystemet-react';

// Enkelt felt
<Textfield label='Fornavn' name='firstName' />

// Med beskrivelse, type og feilmelding
<Textfield
  label='E-post'
  description='Vi sender kvittering hit'
  type='email'
  name='email'
  error='Ugyldig e-postadresse'
/>

// Flerlinjet med tegnteller (blir en textarea)
<Textfield label='Kommentar' multiline counter={200} />

// Med suffix (samme info må også stå i label — skjermlesere leser ikke suffix)
<Textfield label='Beløp i kroner' type='number' suffix='kr' />`;

const textareaSource = `import { Textarea } from '@digdir/designsystemet-react';

<Textarea aria-label='Fritekst' rows={4} />`;

const fieldInputSource = `import { useState } from 'react';
import { Field, Label, Input, ValidationMessage } from '@digdir/designsystemet-react';

function LastNameField() {
  const [value, setValue] = useState('Nordmann Svenske');
  const error = value.includes(' ') ? 'Kan ikke inneholde mellomrom' : undefined;

  return (
    <Field>
      <Label>Etternavn</Label>
      <Field.Description>Kan ikke inneholde mellomrom</Field.Description>
      <Input
        name='lastName'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
}`;

const fieldSelectSource = `import { useState } from 'react';
import { Field, Label, Select, ValidationMessage } from '@digdir/designsystemet-react';

function CountyField() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const error = touched && !value ? 'Du må velge et fylke' : undefined;

  return (
    <Field>
      <Label>Fylke</Label>
      <Select
        name='county'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={!!error}
      >
        <Select.Option value=''>Velg…</Select.Option>
        <Select.Option value='03'>Oslo</Select.Option>
        <Select.Option value='11'>Rogaland</Select.Option>
      </Select>
      {error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
}`;

const fieldsetRadioSource = `import { useState, type FormEvent } from 'react';
import { Fieldset, Radio, ValidationMessage, Button } from '@digdir/designsystemet-react';

function ContactMethodGroup() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const error = submitted && !value ? 'Du må velge et alternativ' : undefined;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Fieldset>
        <Fieldset.Legend>Hvordan vil du bli kontaktet?</Fieldset.Legend>
        <Fieldset.Description>Velg ett alternativ</Fieldset.Description>
        <Radio
          label='E-post'
          name='contact'
          value='email'
          checked={value === 'email'}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label='SMS'
          name='contact'
          value='sms'
          checked={value === 'sms'}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label='Post'
          name='contact'
          value='post'
          checked={value === 'post'}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && <ValidationMessage>{error}</ValidationMessage>}
      </Fieldset>
      <Button type='submit'>Send</Button>
    </form>
  );
}`;

const fieldsetAddressSource = `import { Fieldset, Textfield } from '@digdir/designsystemet-react';

function AddressFieldset() {
  return (
    <Fieldset>
      <Fieldset.Legend>Adresse</Fieldset.Legend>
      <Textfield label='Gateadresse' name='street' />
      <Textfield label='Postnummer' name='zip' size={4} />
      <Textfield label='Poststed' name='city' />
    </Fieldset>
  );
}`;

const submitFormSource = `import { useState, type FormEvent } from 'react';
import { Textfield, Button, ErrorSummary } from '@digdir/designsystemet-react';

type Errors = Record<string, string>;

function validateEmail(value: string): string | undefined {
  if (!value) return 'E-post er påkrevd';
  if (!value.includes('@')) return 'Ugyldig e-postadresse';
  return undefined;
}

function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};

    const name = String(data.get('name') ?? '');
    if (!name) next.name = 'Navn er påkrevd';

    const emailError = validateEmail(String(data.get('email') ?? ''));
    if (emailError) next.email = emailError;

    setErrors(next);

    if (Object.keys(next).length === 0) {
      // send skjemaet
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {Object.keys(errors).length > 0 && (
        <ErrorSummary>
          <ErrorSummary.Heading>
            For å gå videre må du rette opp følgende:
          </ErrorSummary.Heading>
          <ErrorSummary.List>
            {Object.entries(errors).map(([field, message]) => (
              <ErrorSummary.Item key={field}>
                <ErrorSummary.Link href={'#' + field}>{message}</ErrorSummary.Link>
              </ErrorSummary.Item>
            ))}
          </ErrorSummary.List>
        </ErrorSummary>
      )}

      <Textfield label='Navn' name='name' id='name' error={errors.name} />
      <Textfield
        label='E-post'
        name='email'
        id='email'
        type='email'
        error={errors.email}
      />
      <Button type='submit'>Send</Button>
    </form>
  );
}`;

const liveSource = `import { useState, type ChangeEvent } from 'react';
import { Textfield } from '@digdir/designsystemet-react';

function validateEmail(value: string): string | undefined {
  if (!value) return 'E-post er påkrevd';
  if (!value.includes('@')) return 'Ugyldig e-postadresse';
  return undefined;
}

function EmailField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    setError(validateEmail(next));
  }

  return (
    <Textfield
      label='E-post'
      type='email'
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
}`;

const touchedSource = `import { useState, type ChangeEvent } from 'react';
import { Textfield } from '@digdir/designsystemet-react';

function validateEmail(value: string): string | undefined {
  if (!value) return 'E-post er påkrevd';
  if (!value.includes('@')) return 'Ugyldig e-postadresse';
  return undefined;
}

function EmailField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    if (touched) setError(validateEmail(next));
  }

  function handleBlur() {
    setTouched(true);
    setError(validateEmail(value));
  }

  return (
    <Textfield
      label='E-post'
      type='email'
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched ? error : undefined}
    />
  );
}`;

/* -------------------------------------------------------------------------- */
/* Meta + stories                                                             */
/* -------------------------------------------------------------------------- */

const meta = {
  title: 'Documentation/Forms/Skjemakomponenter',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const source = (code: string) => ({ docs: { source: { code, language: 'tsx' } } });

export const InputITabellcelle: Story = {
  render: () => <InlineEditTable />,
  parameters: source(inputSource),
};

export const TextfeltVarianter: Story = {
  render: () => <TextfieldExamples />,
  parameters: source(textfieldSource),
};

export const TextareaEnkel: Story = {
  render: () => <Textarea aria-label='Fritekst' rows={4} />,
  parameters: source(textareaSource),
};

export const FieldMedInput: Story = {
  render: () => <LastNameField />,
  parameters: source(fieldInputSource),
};

export const FieldMedSelect: Story = {
  render: () => <CountyField />,
  parameters: source(fieldSelectSource),
};

export const FieldsetRadiogruppe: Story = {
  render: () => <ContactMethodGroup />,
  parameters: source(fieldsetRadioSource),
};

export const FieldsetAdresse: Story = {
  render: () => <AddressFieldset />,
  parameters: source(fieldsetAddressSource),
};

export const SkjemaMedSubmitvalidering: Story = {
  render: () => <ContactForm />,
  parameters: source(submitFormSource),
};

export const LiveValidering: Story = {
  render: () => <EmailFieldLive />,
  parameters: source(liveSource),
};

export const LiveValideringEtterBlur: Story = {
  render: () => <EmailFieldTouched />,
  parameters: source(touchedSource),
};