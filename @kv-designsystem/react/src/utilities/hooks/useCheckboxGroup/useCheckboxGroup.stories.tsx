import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { Fieldset } from '../../../components/fieldset/Fieldset';
import { ValidationMessage } from '../../../components/typography/validationMessage/ValidationMessage';

import {
  type UseCheckboxGroupProps,
  useCheckboxGroup,
} from './useCheckboxGroup';

const meta: Meta<UseCheckboxGroupProps> = {
  title: 'Hooks/useCheckboxGroup',
  tags: ['alpha'],
  parameters: { layout: 'centered' },
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
          label='E-post'
          {...getCheckboxProps('epost')}
        />
        <Checkbox
          id={context.id + '-telefon'}
          label='Telefon'
          {...getCheckboxProps('telefon')}
        />
        <Checkbox
          id={context.id + '-sms'}
          label='SMS'
          {...getCheckboxProps({ value: 'sms' })}
        />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  }
};

export const Group: Story = {
  render: (args, context) => {
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
          Velg alle alternativene som er relevante for deg.
        </Fieldset.Description>
        <Checkbox
          id={context.id + '-email'}
          label='E-post'
          {...getCheckboxProps('epost')}
        />
        <Checkbox
          id={context.id + '-telefon'}
          label='Telefon'
          {...getCheckboxProps('telefon')}
        />
        <Checkbox
          id={context.id + '-sms'}
          label='SMS'
          {...getCheckboxProps({ value: 'sms' })}
        />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  }
};

export const WithError: Story = {
  args: {
    name: 'my-error',
    error: 'Du må velge minst to kontaktalternativ',
  },
  render: Group.render,
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args, context) => {
    const { getCheckboxProps } = useCheckboxGroup({
      value: ['driftsmeldinger'],
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>
          Hvilke varsler vil du motta?
        </Fieldset.Legend>
        <Fieldset.Description>
          Velg hvilke typer varsler som er relevante for deg.
        </Fieldset.Description>
        <Checkbox
          id={context.id + 'driftsmeldinger'}
          label='Driftsmeldinger'
          description='Varsler ved planlagt vedlikehold og driftsavvik.'
          {...getCheckboxProps({ value: 'driftsmeldinger' })}
        />
        <Checkbox
          id={context.id + 'paaminnelser'}
          label='Påminnelser'
          description='Varsler om frister og oppgaver som krever handling.'
          {...getCheckboxProps({ value: 'paaminnelser' })}
        />
      </Fieldset>
    );
  },
};
