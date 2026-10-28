import cl from 'clsx';
import { CheckmarkCircleFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './DoDont.module.css';

type DoDontProps = {
  description: string;
  children: React.ReactNode;
};

type DoDontCardProps = DoDontProps & {
  variant: 'do' | 'dont';
};


type DoDontGroupProps = {
  children: React.ReactNode;
};


export const DoDontGroup = ({ children }: DoDontGroupProps) => (
  <div className={`${styles.dodontgroup} sb-unstyled`}>{children}</div>
);


const DoDontCard = ({ variant, description, children }: DoDontCardProps) => {
  const icon = variant === 'do' ? <CheckmarkCircleFillIcon /> : <XMarkOctagonFillIcon />;
  const heading = variant === 'do' ? 'Gjør' : 'Unngå';
  const headingColor = variant === 'do' ? 'success' : 'danger';

  return (
    <div className={cl('sb-unstyled', styles.doDontCard)}>
      <div className={styles.header} data-color={headingColor}>
        {icon}
        <Heading data-size='xs' className='sb-unstyled'>{heading}</Heading>
      </div>
      <div className={styles.contentWrapper}>{children}</div>
      <div className={styles.footer}>
        <Paragraph className='sb-unstyled'>
          {description}
        </Paragraph>
      </div>

    </div>
  );
};

export const Do = ({ description, children }: DoDontProps) => {
  return (
    <DoDontCard variant='do' description={description}>
      {children}
    </DoDontCard>
  );
};

export const Dont = ({ description, children }: DoDontProps) => {
  return (
    <DoDontCard variant='dont' description={description}>
      {children}
    </DoDontCard>
  );
};
