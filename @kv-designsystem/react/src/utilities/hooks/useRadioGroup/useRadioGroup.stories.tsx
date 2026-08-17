import type { Meta, StoryObj, StoryContext } from '@storybook/react-vite';
import { Fieldset } from '../../../components/fieldset/Fieldset';
import { Radio } from '../../../components/radio/Radio';
import { ValidationMessage } from '../../../components/typography/validationMessage/ValidationMessage';
import {
  type UseRadioGroupProps,
  useRadioGroup,
} from './useRadioGroup';

const meta: Meta<UseRadioGroupProps> = {
  title: 'Hooks/useRadioGroup',
  tags: ['alpha'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code', // Vis koden som tilhører hver Story direkte (userialisert)

        // Fjern det wrappende "render: (args, context) => {" i preview-koden, så bare selve eksempelet vises.
        transform: (code: string) => {
          if (!code.includes('=>')) return code;

          return code
            .replace(/^[\s\S]*?=>\s*\{/, '') // fjern "{ render: (args, context) => {"
            .replace(/\}\s*\}\s*;?\s*$/, '') // fjern de to avsluttende }
            .replace(/^ {4}/gm, '') // dedent 2 nivåer
            .replace('return', '')
            .trim();
        },
      }
    }
  },
  argTypes: {
    name: {
      table: { type: { summary: 'string' } },
      description:
        'Name of all radios. If no name is passed, an auto-generated name will be created.',
    },
    value: {
      description: 'Value of selected radio',
      table: { defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    onChange: {
      description: 'Callback when selected radio changes',
      table: {
        type: {
          summary:
            '(nextValue: string, prevValue: string, event: Event) => void;',
        },
      },
    },
    error: {
      table: { type: { summary: 'string | ReactNode' } },
      description: 'Shared error message for all radios.',
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set disabled state of all radios',
    },
    readOnly: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set read only state of all radios',
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set required state of all radios',
    },
  },
};

export default meta;

type Story = StoryObj<UseRadioGroupProps>;

const ageGroups = [
  { value: '10-20', label: '10-20 år' },
  { value: '21-45', label: '21-45 år' },
  { value: '46-80', label: '46-80 år' },
];

export const Group: Story = {
  render: (__args: UseRadioGroupProps, context: StoryContext<UseRadioGroupProps>) => {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      name: 'my-group',
      readOnly: false,
      disabled: false,
      value: '',
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Velg din aldersgruppe</Fieldset.Legend>
        <Fieldset.Description>
          Informasjonen blir brukt til å tilpasse innholdet på siden.
        </Fieldset.Description>
        {ageGroups.map((group) => (
          <Radio
            key={group.value}
            id={context.id + '-' + group.value}
            label={group.label}
            {...getRadioProps(group.value)}
          />
        ))}
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
};

const requestOptions = [
  { value: 'vertical-order', label: 'Bestilling av vertikalbilder' },
  { value: 'archived-access', label: 'Tilgang til arkiverte bilder' },
  { value: 'submit-material', label: 'Innsending av bildemateriale' },
];

export const WithError: Story = {
  render: (__args: UseRadioGroupProps, context: StoryContext<UseRadioGroupProps>) => {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      readOnly: false,
      disabled: false,
      value: '',
      error: 'Du må velge et alternativ før du kan fortsette.',
      name: 'request-type',
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Hva gjelder forespørselen?</Fieldset.Legend>
        {requestOptions.map((option) => (
          <Radio
            key={option.value}
            id={context.id + '-' + option.value}
            label={option.label}
            {...getRadioProps(option.value)}
          />
        ))}
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
};

export const Outline: Story = {
  render: (__args: UseRadioGroupProps) => {
    const { getRadioProps } = useRadioGroup({
      name: 'course-level',
      readOnly: false,
      disabled: false,
      value: '',
      variant: 'outline',
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Hvilket kursnivå passer deg best?</Fieldset.Legend>
        <Fieldset.Description>
          Velg nivået som beskriver din erfaring med temaet.
        </Fieldset.Description>
        <Radio
          label='Nybegynner'
          description='Passer for deg som er helt ny og ønsker en rolig introduksjon.'
          {...getRadioProps('beginner')}
        />
        <Radio
          label='Viderekommen'
          description='Passer for deg som kjenner grunnleggende begreper og vil gå dypere.'
          {...getRadioProps('intermediate')}
        />
        <Radio
          label='Ekspert'
          description='Passer for deg som ønsker avanserte temaer og praktiske case.'
          {...getRadioProps('expert')}
        />
      </Fieldset>
    );
  },
};
