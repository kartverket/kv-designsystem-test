import { Card, Heading, Paragraph } from "@kv-designsystem/react";

export function MyCard() {
  return (
    <Card
      data-color="accent"
      variant="tinted"
      data-color-scheme="dark"
      style={{
        maxWidth: '750px',
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
      }}
    >
       <Card.Block>
        <img
          src="https://eiendomsregisteret.kartverket.no/egenregistrering.jpeg"
          alt="Idyllisk bilde av hytte ved vann i solnedgang"
        />
      </Card.Block>
      <Card.Block data-size="md">
      <Heading>
        <a href="https://www.kartverket.no/eiendom/mine-eiendommer/egenregistrering">
          Egenregistrering
        </a>
      </Heading>
      <Paragraph>
        Nå kan eiere og festere registrere opplysninger om egen bolig eller fritidsbolig.
      </Paragraph>
      </Card.Block>
    </Card>
  );
}
