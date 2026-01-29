import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '@digdir/designsystemet-react';

export const Preview = () => {
  return <Heading data-size='2xl' style={{marginBottom: 'var(--ds-size-5)'}}>Dette er en overskrift</Heading>;
};


const meta = {
  component: Heading,
} satisfies Meta<typeof Heading>;
 
export default meta;
