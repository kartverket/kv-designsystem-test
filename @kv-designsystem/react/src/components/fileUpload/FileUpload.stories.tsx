import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
import { Button } from '../button/Button';

const meta = {
  component: FileUpload,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (__args) => (
    <Field>
      <Label>Last opp profilbilde</Label>
      <Field.Description>
        Filen må være i JPG- eller PNG-format og mindre enn 2MB
      </Field.Description>
      <FileUpload>
        <Field.Description>Slipp fil her</Field.Description>
        <Button asChild data-variant='secondary'>
          <span>Velg fil</span>
        </Button>
        <input type='file' accept='image/png, image/jpeg' />
      </FileUpload>
    </Field>
  )
};

export const WithDescription: Story = {
  render: (__args) => (
    <Field>
      <Label>Last opp profilbilde</Label>
      <Field.Description>beskrivelsestekst</Field.Description>
      <FileUpload>
        <Field.Description>Slipp fil her</Field.Description>
        <Field.Description>
          Filen må være i JPG- eller PNG-format og mindre enn 2MB
        </Field.Description>
        <Button asChild data-variant='secondary'>
          <span>Velg fil</span>
        </Button>
        <input type='file' accept='image/png, image/jpeg' />
      </FileUpload>
    </Field>
  )
};
