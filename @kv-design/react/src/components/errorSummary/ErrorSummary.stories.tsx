import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorSummary } from './ErrorSummary';
import { Textfield } from '../textfield/Textfield';

const meta = {
  component: ErrorSummary,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof ErrorSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <ErrorSummary>
      <ErrorSummary.Heading>
        For å gå videre må du rette opp følgende feil:
      </ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href='#'>
            Fødselsdato kan ikke være etter år 2005
          </ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href='#'>
            Telefonnummer kan kun inneholde siffer
          </ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href='#'>E-post må være gyldig</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
  ),
};

// TODO: when clicking the .Link-items it changes the path, we want to stay on the same path
export const WithForm: Story = {
  render: () => (
    <>
      <Textfield
        label='Fornavn'
        id='fornavn'
        error='Fornavn må være minst 2 tegn'
      />

      <Textfield
        label='Telefon'
        id='telefon'
        type='tel'
        error='Telefonnummer kan kun inneholde siffer'
      />

      <ErrorSummary>
        <ErrorSummary.Heading>
          For å gå videre må du rette opp følgende feil:
        </ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href='#fornavn'>
              Fornavn må være minst 2 tegn
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href='#telefon'>
              Telefonnummer kan kun inneholde siffer
            </ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    </>
  )
}
