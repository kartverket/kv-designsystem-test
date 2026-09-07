import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import { Input } from '../../components/input/Input';
import { Textarea } from '../../components/textarea/Textarea';
import { Textfield } from '../../components/textfield/Textfield';
import { Field } from '../../components/field/Field';
import { Fieldset } from '../../components/fieldset/Fieldset';
import { Select } from '../../components/select/Select';
import { Radio } from '../../components/radio/Radio';
import { Button } from '../../components/button/Button';
import { Alert } from '../../components/alert/Alert';
import { Label } from '../../components/typography/label/Label';
import { Heading } from '../../components/typography/heading/Heading';
import { Paragraph } from '../../components/typography/paragraph/Paragraph';
import { ValidationMessage } from '../../components/typography/validationMessage/ValidationMessage';
import { ErrorSummary } from '../../components/errorSummary/ErrorSummary';
import { Table } from '../../components/table/Table';
import { Tag } from '../../components/tag/Tag';

const meta = {
  title: 'Skjemakomponenter',
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const placeNamesForApproval = [
  { id: 'place-1', name: 'Kråkeberget', propertyNumber: 42, unitNumber: 7 },
  { id: 'place-2', name: 'Sildevika', propertyNumber: 42, unitNumber: 12 },
  { id: 'place-3', name: 'Fjellstøtten', propertyNumber: 43, unitNumber: 1 },
];

export const InputInTableCell: Story = {
  render: () => (
    <Table zebra>
      <caption>Stedsnavn til godkjenning</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell scope='col'>Stedsnavn</Table.HeaderCell>
          <Table.HeaderCell scope='col' id='table-note-header'>
            Merknad
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {placeNamesForApproval.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>
              {row.name} (gnr. {row.propertyNumber}, bnr. {row.unitNumber})
            </Table.Cell>
            <Table.Cell>
              <Input
                aria-labelledby='table-note-header'
                placeholder='Legg til merknad'
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const SimpleTextarea: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--ds-size-2)', width: '20rem' }}>
      <Heading level={2} data-size='xs' id='remark-heading'>
        Merknad til grensepåvisning
      </Heading>
      <Paragraph data-size='sm'>
        Beskriv eventuelle avvik du observerte ved oppmøtemerket.
      </Paragraph>
      <Textarea aria-labelledby='remark-heading' rows={4} />
    </div>
  ),
};

export const TextfieldVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--ds-size-4)', width: '20rem' }}>
      <Textfield label='Stedsnavn' placeholder='F.eks. Kråkeberget' />
      <Textfield label='Beskrivelse av lokaliteten' multiline rows={3} />
      <Textfield label='Areal' type='number' suffix='m²' />
      <Textfield label='Kort beskrivelse til kartet' counter={60} />
      <Textfield
        label={[
          'Kommune',
          <Tag
            key='required-tag'
            data-color='warning'
            style={{ marginInlineStart: 'var(--ds-size-2)' }}
          >
            Må fylles ut
          </Tag>,
        ]}
        required
      />
    </div>
  ),
};

export const FieldWithInput: Story = {
  render: () => {
    const [unitNumber, setUnitNumber] = useState('');
    const error =
      unitNumber !== '' && !/^\d+$/.test(unitNumber)
        ? 'Bruksnummer kan bare inneholde tall'
        : undefined;

    return (
      <Field aria-live='polite'>
        <Label>Bruksnummer (bnr)</Label>
        <Field.Description>
          Finner du på eiendomsdokumentene dine, f.eks. 42/7
        </Field.Description>
        <Input
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          aria-invalid={!!error}
        />
        {error && <ValidationMessage>{error}</ValidationMessage>}
      </Field>
    );
  },
};

export const FieldWithSelect: Story = {
  render: () => (
    <Field>
      <Label>Type eiendom</Label>
      <Select defaultValue=''>
        <Select.Option value='' disabled>
          Velg eiendomstype &hellip;
        </Select.Option>
        <Select.Option value='residential'>Boligeiendom</Select.Option>
        <Select.Option value='holiday-home'>Fritidseiendom</Select.Option>
        <Select.Option value='agricultural'>Landbrukseiendom</Select.Option>
        <Select.Option value='commercial'>Næringseiendom</Select.Option>
        <Select.Option value='undeveloped-plot'>Ubebygd tomt</Select.Option>
      </Select>
    </Field>
  ),
};

export const FieldsetRadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    // Derived from submitted + selectedValue: the error disappears as soon as
    // the user picks an option, without having to resubmit the form.
    const showError = submitted && !selectedValue;

    return (
      <form
        style={{ display: 'grid', gap: 'var(--ds-size-4)', width: '20rem' }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Fieldset aria-live='polite'>
          <Fieldset.Legend>Hva gjelder henvendelsen?</Fieldset.Legend>
          <Fieldset.Description>
            Velg det alternativet som passer best.
          </Fieldset.Description>
          <Radio
            label='Eierskifte'
            name='requestType'
            value='change-of-ownership'
            checked={selectedValue === 'change-of-ownership'}
            onChange={() => setSelectedValue('change-of-ownership')}
          />
          <Radio
            label='Grensejustering'
            name='requestType'
            value='boundary-adjustment'
            checked={selectedValue === 'boundary-adjustment'}
            onChange={() => setSelectedValue('boundary-adjustment')}
          />
          <Radio
            label='Sammenslåing av eiendommer'
            name='requestType'
            value='property-merger'
            checked={selectedValue === 'property-merger'}
            onChange={() => setSelectedValue('property-merger')}
          />
          {showError && (
            <ValidationMessage>
              Du må velge hva henvendelsen gjelder
            </ValidationMessage>
          )}
        </Fieldset>
        <Button type='submit'>Send inn</Button>
      </form>
    );
  },
};

export const FieldsetAddress: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Adresse til eiendommen</Fieldset.Legend>
      <Textfield label='Gate-/veiadresse' />
      <div style={{ display: 'flex', gap: 'var(--ds-size-4)' }}>
        <Textfield label='Postnummer' style={{ width: '8rem' }} />
        <Textfield label='Poststed' />
      </div>
    </Fieldset>
  ),
};

const validateOrderForm = (form: HTMLFormElement) => {
  const data = new FormData(form);
  const propertyNumber = String(data.get('propertyNumber') ?? '');
  const unitNumber = String(data.get('unitNumber') ?? '');
  const email = String(data.get('email') ?? '');

  const errors: Record<string, string> = {};
  if (!/^\d+$/.test(propertyNumber))
    errors.propertyNumber = 'Gårdsnummer må være et tall';
  if (!/^\d+$/.test(unitNumber))
    errors.unitNumber = 'Bruksnummer må være et tall';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'E-postadressen er ikke gyldig';
  return errors;
};

export const FormWithSubmitValidation: Story = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validateOrderForm(e.currentTarget);
      setErrors(validationErrors);
      setSubmitted(true);
      setSucceeded(Object.keys(validationErrors).length === 0);
    };

    // After the first submit attempt we validate live, so the errors
    // disappear from the summary as soon as the user corrects them.
    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
      if (submitted) setErrors(validateOrderForm(e.currentTarget));
      setSucceeded(false);
    };

    return (
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        style={{ display: 'grid', gap: 'var(--ds-size-4)', width: '30rem' }}
      >
        <Paragraph
          data-size='sm'
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-size-2)' }}
        >
          <Tag data-color='warning' data-size='sm'>
            Må fylles ut
          </Tag>
          Alle feltene i skjemaet må fylles ut.
        </Paragraph>
        <div aria-live='polite'>
          <Textfield
            label='Gårdsnummer (gnr)'
            id='propertyNumber'
            name='propertyNumber'
            error={errors.propertyNumber}
          />
        </div>
        <div aria-live='polite'>
          <Textfield
            label='Bruksnummer (bnr)'
            id='unitNumber'
            name='unitNumber'
            error={errors.unitNumber}
          />
        </div>
        <div aria-live='polite'>
          <Textfield
            label='E-post for tilbakemelding'
            id='email'
            name='email'
            type='email'
            error={errors.email}
          />
        </div>
        {Object.keys(errors).length > 0 && (
          <ErrorSummary>
            <ErrorSummary.Heading>
              For å gå videre må du rette opp følgende feil:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              {Object.entries(errors).map(([id, message]) => (
                <ErrorSummary.Item key={id}>
                  <ErrorSummary.Link
                    href={`#${id}`}
                    onClick={(e) => {
                      // Prevents the browser from following the href fragment: in
                      // Storybook's docs view that triggers a full page navigation
                      // instead of just jumping to the field.
                      e.preventDefault();
                      document.getElementById(id)?.focus();
                    }}
                  >
                    {message}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              ))}
            </ErrorSummary.List>
          </ErrorSummary>
        )}
        <div aria-live='polite'>
          {succeeded && (
            <Alert data-color='success'>
              Bestillingen er sendt inn. Du får en bekreftelse på e-post når vi
              har mottatt den.
            </Alert>
          )}
        </div>
        <Button type='submit'>Bestill eiendomsinformasjon</Button>
      </form>
    );
  },
};

export const LiveValidation: Story = {
  render: () => {
    const [postalCode, setPostalCode] = useState('');
    const error =
      postalCode !== '' && !/^\d{4}$/.test(postalCode)
        ? 'Postnummer må bestå av 4 siffer'
        : undefined;

    return (
      <div aria-live='polite'>
        <Textfield
          label='Postnummer'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          error={error}
        />
      </div>
    );
  },
};

export const LiveValidationAfterBlur: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [hasBlurred, setHasBlurred] = useState(false);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const error = hasBlurred && !isValid ? 'E-postadressen er ikke gyldig' : undefined;

    return (
      <div aria-live='polite'>
        <Textfield
          label='E-postadresse'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setHasBlurred(true)}
          error={error}
        />
      </div>
    );
  },
};
