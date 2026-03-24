import { Alert } from '../components/alert/Alert';
import { Heading } from '../components/typography/heading/Heading';
import { Link } from '../components/link/Link';

export function UnderConstructionAlert() {
    return (
        <Alert>
            <Heading     
                data-size='xs'
                level={2}
                style={{
                    marginBottom: 'var(--ds-size-2)'
                }}
            >
                Denne siden er under utvikling
            </Heading>
            Vi jobber med å gå over til et nytt designsystem basert på <Link href='https://designsystemet.no/no'>Designsystemet</Link> av Digdir. I første omgang er det kun komponentene fra Digidr som er lagt til med våre farger. Tilpasninger, tillegg og andre endringer vil skje fortløpende.  
        </Alert>
    )
}
