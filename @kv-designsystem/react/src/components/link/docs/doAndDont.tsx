import { Do, DoDontGroup, Dont } from '.storybook/docs/components/DoDont/DoDont';
import { Link } from '../Link';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

export const LinkEx1 = () => {
  return (
    <DoDontGroup>
      <Do description="Bruk tekst for å forklare hva lenken leder til.">
        <Link href="https://data.norge.no/guide/veileder-apne-data">
          Les dokumentasjonen for åpen datadeling hos data.norge.no
        </Link>
      </Do>
      <Dont description="Ikke bruk ikon for eksterne lenker.">
        <Link href="">
          <ExternalLinkIcon aria-hidden />
          <span>Åpne data</span>
        </Link>
      </Dont>
    </DoDontGroup>
  );
};
