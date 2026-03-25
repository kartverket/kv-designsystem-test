import { Button } from '../components/button/Button';
import { Link } from '../components/link/Link';
import { Heading, type HeadingProps } from '../components/typography/heading/Heading'; 

export function FeedbackSection({ level = 2 }: HeadingProps) {
    return (
        <section>
            <Heading level={level} data-size='xs'>Hjelp oss med å forbedre designsystemet</Heading>
            <div 
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 'var(--ds-size-4)',
                }}
            >
                <Button variant='secondary'>
                    <Link     
                        href='https://kartverketgroup.slack.com/archives/C03LL4CKMMK'
                        rel='noreferrer'
                        target='_blank'>
                    Kontakt oss på Slack
                    </Link>
                </Button>
                <Button variant='secondary'>
                    <Link     
                        href='https://forms.office.com/pages/responsepage.aspx?id=osh0f85Dskaw6LYwbLpzo1ZKQ5cY--ZJmCXFNxxffudUMjQ2WU1IS1FNQzNQRlBaU1IwMFpYNENXQS4u&route=shorturl'
                        rel='noreferrer'
                        target='_blank'>
                    Tilbakemeldingsskjema
                    </Link>
                </Button>
            </div>
        </section>
    )
}
