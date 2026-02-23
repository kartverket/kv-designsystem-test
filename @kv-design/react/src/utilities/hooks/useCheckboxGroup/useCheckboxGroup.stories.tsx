import type { Meta, StoryObj, StoryContext } from '@storybook/react-vite';
// import { formatReactSource } from '.storybook/utils/sourceTransformers';

import { Button } from '../../../components/button/Button';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { Chip } from '../../../components/chip/Chip';
import { Divider } from '../../../components/divider/Divider';
import { Fieldset } from '../../../components/fieldset/Fieldset';
import { Table } from '../../../components/table/Table';
import { Paragraph } from '../../../components/paragraph/Paragraph';
import { ValidationMessage } from '../../..//components/validationMessage/ValidationMessage';

import {
  type UseCheckboxGroupProps,
  useCheckboxGroup,
} from './useCheckboxGroup';

const meta: Meta<UseCheckboxGroupProps> = {
  title: 'Utilities/useCheckboxGroup',
  tags: ['alpha'],
  argTypes: {
    name: {
      table: { type: { summary: 'string' } },
      description:
        'Name of all checkboxes. If no name is passed, an auto-generated name will be created.',
    },
    value: {
      description: 'Array of values of selected checkboxes',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string[]' },
      },
    },
    onChange: {
      description: 'Callback when selected checkboxes changes',
      table: {
        type: {
          summary:
            '(nextValue: string[], prevValue: string[], event: ChangeEvent<HTMLInputElement>) => void;',
        },
      },
    },
    error: {
      table: { type: { summary: 'string | ReactNode' } },
      description: 'Shared error message for all checkboxes.',
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set disabled state of all checkboxes',
    },
    readOnly: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set read only state of all checkboxes',
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set required state of all checkboxes',
    },
  },
};

export default meta;

type Story = StoryObj<UseCheckboxGroupProps>;

/* ---------------------------------- */
/* Default */
/* ---------------------------------- */

export const Default: Story = {
  render: (args, context) => {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ['epost'],
      ...args,
    });

    return (
      <Fieldset>
        <Checkbox
          id={context.id + '-email'}
          label="E-post"
          {...getCheckboxProps('epost')}
        />
        <Checkbox
          id={context.id + '-telefon'}
          label="Telefon"
          {...getCheckboxProps('telefon')}
        />
        <Checkbox
          id={context.id + '-sms'}
          label="SMS"
          {...getCheckboxProps({ value: 'sms' })}
        />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
};

/* ---------------------------------- */
/* Shared Group Render */
/* ---------------------------------- */

const renderGroup = (
  args: UseCheckboxGroupProps,
  context: StoryContext<UseCheckboxGroupProps>,
) => {
  const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
    value: ['epost'],
    ...args,
  });

  return (
    <Fieldset>
      <Fieldset.Legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </Fieldset.Legend>
      <Fieldset.Description>
        Velg de alternativene som er relevante for deg.
      </Fieldset.Description>
      <Checkbox
        id={context.id + '-email'}
        label="E-post"
        {...getCheckboxProps('epost')}
      />
      <Checkbox
        id={context.id + '-telefon'}
        label="Telefon"
        {...getCheckboxProps('telefon')}
      />
      <Checkbox
        id={context.id + '-sms'}
        label="SMS"
        {...getCheckboxProps('sms')}
      />
      <ValidationMessage {...validationMessageProps} />
    </Fieldset>
  );
};

const groupBaseArgs: UseCheckboxGroupProps = {
  name: 'my-group',
  disabled: false,
  error: '',
};

/* ---------------------------------- */
/* Group Variants */
/* ---------------------------------- */

export const Group: Story = {
  args: groupBaseArgs,
  render: renderGroup,
};

export const WithError: Story = {
  args: {
    ...groupBaseArgs,
    name: 'my-error',
    error: 'Du må velge minst to kontaktalternativ',
  },
  render: renderGroup,
};

export const ReadOnly: Story = {
  args: {
    ...groupBaseArgs,
    name: 'my-readonly',
    readOnly: true,
  },
  render: renderGroup,
};

export const Disabled: Story = {
  args: {
    ...groupBaseArgs,
    name: 'my-disabled',
    disabled: true,
  },
  render: renderGroup,
};

/* ---------------------------------- */
/* IndeterminateInTable */
/* ---------------------------------- */

export const IndeterminateInTable: Story = {
  render: (args, context) => {
    const { getCheckboxProps } = useCheckboxGroup({
      name: context.id,
      value: ['2', '3'],
      ...args,
    });

    const people = [
      { id: 1, name: 'Lise Nordmann', education: 'Barnehage' },
      { id: 2, name: 'Ola Nordmann', education: 'Grunnskole' },
      { id: 3, name: 'Kari Nordmann', education: 'Videregående' },
      { id: 4, name: 'Per Nordmann', education: 'Barnehage' },
    ];

    return (
      <Table>
        <colgroup>
          <col style={{ width: '1px' }} />
          <col style={{ width: '10em' }} />
          <col />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                id={context.id + '-all'}
                aria-label="Velg alle"
                {...getCheckboxProps({
                  allowIndeterminate: true,
                  value: 'all',
                })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Navn</Table.HeaderCell>
            <Table.HeaderCell>Utdanningsnivå</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {people.map((person) => (
            <Table.Row key={person.name}>
              <Table.Cell>
                <Checkbox
                  id={`${context.id}-${person.id}`}
                  aria-labelledby={`${context.id}-${person.id}-name`}
                  {...getCheckboxProps(person.id.toString())}
                />
              </Table.Cell>
              <Table.Cell id={`${context.id}-${person.id}-name`}>
                {person.name}
              </Table.Cell>
              <Table.Cell>{person.education}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

/* ---------------------------------- */
/* Controlled */
/* ---------------------------------- */

// export const Controlled: Story = {
//   render: (args, context) => {
//     const choices = {
//       barnehage: { label: 'Barnehage' },
//       grunnskole: { label: 'Grunnskole' },
//       videregaende: { label: 'Videregående' },
//     };

//     const { getCheckboxProps, validationMessageProps, value, setValue } =
//       useCheckboxGroup({
//         name: 'my-controlled',
//         value: ['barnehage', 'videregaende'],
//         ...args,
//       });

//     const toggle = (haystack: string[], needle: string) =>
//       haystack.includes(needle)
//         ? haystack.filter((v) => v !== needle)
//         : haystack.concat(needle);

//     const isFiltered = value.length > 0;

//     return (
//       <>
//         <Fieldset>
//           <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
//           {Object.entries(choices).map(([val, { label }]) => (
//             <Checkbox
//               key={val}
//               id={`${context.id}-${val}`}
//               label={label}
//               {...getCheckboxProps(val)}
//             />
//           ))}
//         </Fieldset>

//         <ValidationMessage {...validationMessageProps} />

//         <Divider />
//         <Paragraph>(Annet innhold)</Paragraph>
//         <Divider />

//         <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
//           <Paragraph>
//             {isFiltered ? 'Viser innhold for:' : 'Viser alt innhold'}
//           </Paragraph>

//           {isFiltered &&
//             value.map((v) => (
//               <Chip.Removable
//                 key={v}
//                 aria-label={`Slett ${choices[v].label}`}
//                 onClick={() => setValue(toggle(value, v))}
//               >
//                 {choices[v].label}
//               </Chip.Removable>
//             ))}
//         </div>

//         {isFiltered && (
//           <Button
//             style={{ width: 'fit-content' }}
//             variant="secondary"
//             onClick={() => setValue([])}
//           >
//             Tøm filtre
//           </Button>
//         )}
//       </>
//     );
//   },
//   parameters: {
//     customStyles: {
//       display: 'flex',
//       gap: 'var(--ds-size-4)',
//       flexDirection: 'column',
//     },
//     docs: { source: { type: 'code', transform: formatReactSource } },
//   },
// };