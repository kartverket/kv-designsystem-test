import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Table } from '../Table';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const TableHead: FunctionComponent<
  Omit<ComponentProps<typeof Table.Head>, 'children'> & {
    /** Should be one or more Table.Row elements */
    children?: ReactNode;
  }
> = () => null;

const TableBody: FunctionComponent<
  Omit<ComponentProps<typeof Table.Body>, 'children'> & {
    /** Should be one or more Table.Row elements */
    children?: ReactNode;
  }
> = () => null;

const TableFoot: FunctionComponent<
  Omit<ComponentProps<typeof Table.Foot>, 'children'> & {
    /** Should be one or more Table.Row elements */
    children?: ReactNode;
  }
> = () => null;

const TableRow: FunctionComponent<
  Omit<ComponentProps<typeof Table.Row>, 'children'> & {
    /** Should be one or more Table.Cell or Table.HeaderCell elements */
    children?: ReactNode;
  }
> = () => null;

const TableHeaderCell: FunctionComponent<
  Omit<ComponentProps<typeof Table.HeaderCell>, 'children'> & {
    /** The content of the header cell */
    children?: ReactNode;
  }
> = () => null;

const TableCell: FunctionComponent<
  Omit<ComponentProps<typeof Table.Cell>, 'children'> & {
    /** The content of the cell */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Table's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Table.Head': TableHead,
  'Table.Body': TableBody,
  'Table.Foot': TableFoot,
  'Table.Row': TableRow,
  'Table.HeaderCell': TableHeaderCell,
  'Table.Cell': TableCell,
};
