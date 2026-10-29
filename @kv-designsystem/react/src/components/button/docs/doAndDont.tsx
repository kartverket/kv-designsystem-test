import { Button } from '../Button';
import { Do, DoDontGroup, Dont } from '.storybook/docs/components/DoDont/DoDont';

export const ButtonEx1 = () => {
  return (
    <DoDontGroup>
      <Do description="En knapp skal kun gjøre én handling">
        <Button>Fortsett senere</Button>
        <Button variant="tertiary">Avbryt</Button>
      </Do>
      <Dont description="Unngå flere handlinger på samme knapp">
        <Button>Avbryt og fortsett senere</Button>
      </Dont>
    </DoDontGroup>
  );
};

export const ButtonEx2 = () => {
  return (
    <DoDontGroup>
      <Do description="Det skal kun være én primærknapp per side">
        <Button variant="primary">Send inn</Button>
        <Button variant="secondary">Lagre utkast</Button>
        <Button data-color="danger" variant="tertiary">
          Forkast
        </Button>
      </Do>
      <Dont description="Vi skal ikke ha flere primærknapper på samme side">
        <Button variant="primary">Send inn</Button>
        <Button variant="primary">Lagre utkast</Button>
        <Button variant="primary">Forkast</Button>
      </Dont>
    </DoDontGroup>
  );
};
