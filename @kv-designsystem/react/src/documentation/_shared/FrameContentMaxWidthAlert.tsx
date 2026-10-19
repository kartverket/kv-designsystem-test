import { Alert } from '../../components/alert/Alert';
import { Heading } from '../../components/typography/heading/Heading';

export function FrameContentMaxWidthAlert() {
  return (
    <Alert data-color="info" className="sb-unstyled" style={{ marginBottom: 'var(--ds-size-5)' }}>
      <Heading data-size="xs" level={3}>
        Global max-width
      </Heading>
      Header, Footer og ConsentBanner bruker den globale variabelen{' '}
      <code>--kvds-frame-content-max-width</code> for å styre maksimal bredde på innholdet. Hvis du
      ønsker å endre denne verdien, kan du overstyre variabelen globalt i <code>:root</code>.
    </Alert>
  );
}
