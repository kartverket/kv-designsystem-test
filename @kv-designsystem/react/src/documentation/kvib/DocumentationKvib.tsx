import classes from '../styles/layout.module.css';
import { Card } from '../../components/card/Card';
import { Link } from '../../components/link/Link';
import { Heading } from '../../components/typography/heading/Heading';
import { Paragraph } from '../../components/typography/paragraph/Paragraph';

const pages = [
  {
    title: 'Storybook',
    href: 'https://kartverket.github.io/kvib/',
    description: 'Retningslinjer for komponentene.',
  },
  {
    title: 'Github',
    href: 'https://github.com/kartverket/kvib',
    description: 'Teknisk dokumentasjon.',
  },
];

export function DocumentationKvib() {
  return (
    <div className={`${classes.grid} sb-unstyled`} >
      {pages.map((page) => (
        <Card key={page.title}>
          <Card.Block>
            <Heading level={3} data-size='sm'>
              <Link href={page.href}>
                {page.title}
              </Link>
            </Heading>
            <Paragraph className="sb-unstyled">{page.description}</Paragraph>
          </Card.Block>
        </Card>
      ))}
    </ div>
  )
};
