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

const GroupBase = {
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

export const Group: Story = {
  ...GroupBase,
};

export const WithError: Story = {
  args: {
    ...GroupBase.args,
    error: 'Du må velge en aldersgruppe',
    name: 'my-error',
  },
  render: GroupBase.render,
}