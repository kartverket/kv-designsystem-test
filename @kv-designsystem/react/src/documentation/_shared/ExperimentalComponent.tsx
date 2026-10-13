import { Alert } from '../../components/alert/Alert';
import { Link } from '../../components/link/Link';

export default function ExperimentalComponent({ component }: { component: string }) {
  return (
    <Alert data-color="warning" className="sb-unstyled">
      {component} er under utvikling. Finner du feil eller mangler, meld fra i{' '}
      <Link href="https://kartverketgroup.slack.com/archives/C03LL4CKMMK">Slack</Link>.
    </Alert>
  );
}
