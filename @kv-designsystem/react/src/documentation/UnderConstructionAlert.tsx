import { Alert } from '../components/alert/Alert';
import { Heading } from '../components/typography/heading/Heading';
import { Link } from '../components/link/Link';

export function UnderConstructionAlert() {
    return (
        <Alert 
            data-color='warning'
            className="sb-unstyled"
            style={{
                marginBottom: 'var(--ds-size-10)'
            }}>
            <Heading     
                data-size='xs'
                level={2}
                style={{
                    marginBottom: 'var(--ds-size-2)'
                }}
            >
                Designsystemet er under utvikling
            </Heading>
            Vi jobber med et helt nytt designsystem med <Link href='https://designsystemet.no/no'>Digdir Designsystemet</Link> som fundament. Vi er i første fase (alpha) som vil si at tilpasninger, tillegg og andre endringer vil skje fortløpende.  
        </Alert>
    )
}
