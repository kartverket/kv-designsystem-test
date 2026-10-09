import { Button } from '../../components/button/Button';
import { Link } from '../../components/link/Link';
import { Heading, type HeadingProps } from '../../components/typography/heading/Heading';

const marginByLevel = {
  1: 'var(--ds-size-12) var(--ds-size-6)',
  2: 'var(--ds-size-10) var(--ds-size-4)',
  3: 'var(--ds-size-8) var(--ds-size-3)',
  4: 'var(--ds-size-6) var(--ds-size-2)',
  5: 'var(--ds-size-4) var(--ds-size-1)',
  6: 'var(--ds-size-4) var(--ds-size-1)',
};

export function FeedbackSection({ level = 2, 'data-size': dataSize = 'md' }: HeadingProps) {
  return (
    <section>
      <Heading
        level={level}
        data-size={dataSize}
        className='sb-unstyled'
        style={{
          marginBlock: marginByLevel[level as keyof typeof marginByLevel] ?? 'var(--ds-size-8) var(--ds-size-3)',
        }}
      >
        Hjelp oss med å forbedre designsystemet
      </Heading>
      <div
        className='sb-unstyled'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Button asChild variant='secondary'>
          <Link
            className='sb-unstyled'
            href='https://kartverketgroup.slack.com/archives/C03LL4CKMMK'
          >
            Kontakt oss på Slack
          </Link>
        </Button>
        <Button asChild variant='secondary'>
          <Link
            className='sb-unstyled'
            href='https://forms.office.com/pages/responsepage.aspx?id=osh0f85Dskaw6LYwbLpzo1ZKQ5cY--ZJmCXFNxxffudUMjQ2WU1IS1FNQzNQRlBaU1IwMFpYNENXQS4u&route=shorturl'
          >
            Tilbakemeldingsskjema
          </Link>
        </Button>
      </div>
    </section>
  )
};
