import { Card, Heading, Paragraph } from '@kv-designsystem/react';

export function MyCard() {
  return (
    <Card
      data-color="accent"
      // variant="tinted"
      style={{
        maxWidth: '320px',
      }}
    >
      <Card.Block>
        <img
          alt="Idyllisk bilde av hytte ved vann i solnedgang"
          src="https://eiendomsregisteret.kartverket.no/egenregistrering.jpeg"
        />
      </Card.Block>
      <Card.Block>
        <Heading>
          <a href="https://www.kartverket.no/eiendom/mine-eiendommer/egenregistrering">
            Egenregistrering
          </a>
        </Heading>
        <Paragraph>Nå kan eiere og festere registrere opplysninger om sin bolig eller fritidsbolig.</Paragraph>
        {/* <Paragraph data-size="sm">Fotnote</Paragraph> */}
      </Card.Block>
    </Card>
  );
}
