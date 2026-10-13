import { Source } from '@storybook/addon-docs/blocks';
import { Tabs } from "../../components/tabs/Tabs";
import { Card } from '../../components/card/Card';
import { Heading } from '../../components/typography/heading/Heading';
import { List } from '../../components/list/List';

export function SizeTabs() {
  return (
    <Card className='sb-unstyled'>
      <Tabs defaultValue='kode'>
        <Tabs.List>
          <Tabs.Tab value='kode'>
            Kode
          </Tabs.Tab>
          <Tabs.Tab value='figma'>
            Figma
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='kode' style={{ paddingBlock: 'var(--ds-size-6) 0' }}>
          Slik setter du <code>data-size</code> for hele løsningen:
          <Source
            language='html'
            code={`
            <body data-size="sm">
            </body>
          `}>
          </Source>
          Slik setter du <code>data-size</code> for en komponent og alle etterkommere:
          <Source
            language='html'
            code={`
            <Card data-size=”lg”>
              /* legg innhold her */
            </ Card>
          `}>
          </Source>
        </Tabs.Panel>

        <Tabs.Panel value='figma' style={{ paddingBlock: '0' }}>
          <Heading data-size='xs' style={{ marginTop: 'var(--ds-size-6)', marginBottom: 'var(--ds-size-2)' }}>
            Slik velger du størrelsesvariabler i Figma:
          </Heading>
          <List.Unordered>
            <List.Item>Marker en komponent eller en frame med Auto layout</List.Item>
            <List.Item>
              Under Auto layout i høyre sidepanel kan du:
              <List.Unordered>
                <List.Item>
                  Justere Gap for avstand i mellom flere komponenter
                </List.Item>
                <List.Item>
                  Justere Padding for å legg på luft på alle, én eller flere sider av en komponent/frame
                </List.Item>
              </List.Unordered>
            </List.Item>
            <List.Item>Klikk på feltet og velg "Apply variable"</List.Item>
            <List.Item>Sørg for at riktig bibliotek er valgt</List.Item>
            <List.Item>Nå får du opp lista over variabelene vi bruker til størrelser og avstander</List.Item>
          </List.Unordered>
          <Heading data-size='xs' style={{ marginTop: 'var(--ds-size-6)', marginBottom: 'var(--ds-size-2)' }}>
            Slik endrer du størrelsesmodus i Figma:
          </Heading>
          <List.Unordered>
            <List.Item>Marker en komponent eller en frame</List.Item>
            <List.Item>Gå til Appearance i høyre sidepanel</List.Item>
            <List.Item>Velg size mode</List.Item>
          </List.Unordered>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
