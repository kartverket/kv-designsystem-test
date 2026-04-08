import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer, FooterItem } from './';

const meta = {
  component: Footer
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <Footer>
      <Footer.List>
        <Footer.Item href='#' >Om tjenesten</Footer.Item>
        <Footer.Item href='#'>Kontakt oss</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href='#' >Lenke</Footer.Item>
        <Footer.Item href='#'>Lenke</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href='#' >Personsvernserklæring</Footer.Item>
        <Footer.Item href='#'>Informasjonskapsler</Footer.Item>
        <Footer.Item href="#">Tilgjengelighetserklæring</Footer.Item>
      </Footer.List>
    </Footer>
  )
};
