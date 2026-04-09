import { ExternalLinkIcon } from '@navikt/aksel-icons';
import classes from '../styles/layout.module.css';
import { Card } from '../../components/card/Card';
import { Link } from '../../components/link/Link';
import { Heading } from '../../components/typography/heading/Heading';
import { Paragraph } from '../../components/typography/paragraph/Paragraph';
import { getPath } from '../../../.storybook/utils/getPath';

const pages = [
    {
        title: 'Kom i gang som utvikler',
        href: getPath('/docs/kom-i-gang-som-utvikler--docs'),
        description: 'En steg for steg guide for hvordan du tar i bruk designsystemet som utvikler.',
    },
    {
        title: 'Kom i gang med design',
        href: getPath('/docs/kom-i-gang-med-design--docs'),
        description: 'En guide for hvordan du tar i bruk designsystemet i Figma.',
    },
    {
        title: 'Komponenter',
        href: getPath('/docs/komponentoversikt--docs'),
        description: 'Et bibliotek med komponenter, forhåndsvisninger, kildekode og retningslinjer for bruk.',
    },
    {
        title: 'Tokens',
        href: getPath('/docs/design-tokens-og-variabler--docs'),
        description: 'Våre design tokens som styrer blant annet farger, størrelser og avstander på tvers av kode og Figma.',
    },
    {
        title: 'Visuell identitet',
        href: 'https://www.kartverket.no/om-kartverket/kartverkets-identitet',
        description: 'Bli kjent med Kartverket sin merkevare. Veiledning og retningslinjer til deg som skal ta identiteten i bruk.',
        external: true,
    },
];

export function DocumentationOverview() {
    return (
        <div className={classes.grid} >
            {pages.map((page) => (
                <Card key={page.title}>
                    <Card.Block>
                        <Heading>
                            <Link 
                                href={page.href}
                                {...(page.external && {
                                    rel: 'noopener noreferrer',
                                    target: '_blank',
                                })}
                            >
                                {page.title}
                                {page.external && <ExternalLinkIcon />}
                            </Link>
                        </Heading>
                        <Paragraph>{page.description}</Paragraph>
                    </Card.Block>
                </Card>
            ))}
        </ div>
    )
};
