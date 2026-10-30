import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { Fieldset } from '../fieldset/Fieldset';
import { Flex } from '../layout/Flex';

const meta = {
  component: Radio,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    label: 'Radio',
  },
};

export const InLine: Story = {
  args: {
    label: 'Radio',
  },
  render: (_args) => (
    <Fieldset>
      <Fieldset.Legend>Vil du bli kontaktet på e-post?</Fieldset.Legend>
      <Flex gap={6}>
        <Radio name="my-inline" label="Ja" value="ja" />
        <Radio name="my-inline" label="Nei" value="nei" />
      </Flex>
    </Fieldset>
  ),
};
