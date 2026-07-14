import cl from 'clsx';
import { CheckmarkIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Heading } from '../../../../src/components/typography/heading/Heading';
import { Paragraph } from '../../../../src/components/typography/paragraph/Paragraph';
import styles from './DoAndDont.module.css';

const Wrapper = ({ variant, description, children }: WrapperProps) => {
  const icon = variant === 'do' ? <CheckmarkIcon /> : <XMarkOctagonFillIcon />;
  const heading = variant === 'do' ? 'Gjør slik' : 'Unngå dette';

  return (
    <figure
      className={cl('sb-unstyled', styles.wrapper, styles[variant])}
      data-color-scheme="light"
    >
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <Heading
          asChild
          data-size="sm"
          style={{
            margin: 0,
            border: 'none',
          }}
          className="sb-unstyled"
        >
          <p>{heading}</p>
        </Heading>
      </div>
      <figcaption>
        <Paragraph className={cl(styles.description, 'sb-unstyled')}>
          {description}
        </Paragraph>
      </figcaption>
      <div className={styles.contentWrapper}>{children}</div>
    </figure>
  );
};

export const Do = ({ description, children }: DoAndDontProps) => {
  return (
    <Wrapper variant="do" description={description}>
      {children}
    </Wrapper>
  );
};

export const Dont = ({ description, children }: DoAndDontProps) => {
  return (
    <Wrapper variant="dont" description={description}>
      {children}
    </Wrapper>
  );
};

type DoAndDontProps = {
  description: string;
  children: React.ReactNode;
};

type WrapperProps = DoAndDontProps & {
  variant: 'do' | 'dont';
};
