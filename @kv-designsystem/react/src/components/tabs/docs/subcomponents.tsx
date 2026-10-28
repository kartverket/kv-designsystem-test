import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Tabs } from '../Tabs';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const TabsList: FunctionComponent<
  Omit<ComponentProps<typeof Tabs.List>, 'children'> & {
    /** Should be one or more Tabs.Tab elements */
    children?: ReactNode;
  }
> = () => null;

const TabsTab: FunctionComponent<
  Omit<ComponentProps<typeof Tabs.Tab>, 'children'> & {
    /** Label of the tab */
    children?: ReactNode;
  }
> = () => null;

const TabsPanel: FunctionComponent<
  Omit<ComponentProps<typeof Tabs.Panel>, 'children'> & {
    /** Content shown when the tab is selected */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Tabs's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Tabs.List': TabsList,
  'Tabs.Tab': TabsTab,
  'Tabs.Panel': TabsPanel,
};
