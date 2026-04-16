import { Header as HeaderRoot } from './Header';
import { HeaderItem } from './HeaderItem';
import { HeaderList } from './HeaderList';

type HeaderProps = typeof HeaderRoot & {
  List: typeof HeaderList;
  Item: typeof HeaderItem;
};

// Object.assign gjør at Header.Item kan brukes som underkomponent
const Header: HeaderProps = Object.assign(HeaderRoot, {
  List: HeaderList,
  Item: HeaderItem,
});

Header.List.displayName = 'Header.List';
Header.Item.displayName = 'Header.Item';

export type { HeaderProps } from './Header';
export type { HeaderListProps } from './HeaderList';
export type { HeaderItemProps } from './HeaderItem';
export { Header };
