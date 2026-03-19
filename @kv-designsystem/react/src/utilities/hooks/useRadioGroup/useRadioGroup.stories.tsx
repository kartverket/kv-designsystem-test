import type { Meta, StoryObj, StoryContext } from '@storybook/react-vite';
import { Fieldset } from '../../../components/fieldset/Fieldset'; 
import { Radio } from '../../../components/radio/Radio';
import { ValidationMessage } from '../../../components/typography/validationMessage/ValidationMessage';
import { 
    type UseRadioGroupProps,
    useRadioGroup,
} from './useRadioGroup';

const meta: Meta<UseRadioGroupProps> = {
  title: 'Utilities/useRadioGroup',
  tags: ['alpha'],
  parameters: { layout: 'centered' },
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
  args: {
    name: 'my-group',
    readOnly: false,
    disabled: false,
    value: '',
  },
  render: (args: UseRadioGroupProps, context: StoryContext<UseRadioGroupProps>) => {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Velg din aldersgruppe.</Fieldset.Legend>
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
  args: {
    readOnly: false,
    disabled: false,
    value: '',
    error: 'Du må velge et alternativ før du kan fortsette.',
    name: 'request-type',
  },
  render: (args: UseRadioGroupProps, context: StoryContext<UseRadioGroupProps>) => {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
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
