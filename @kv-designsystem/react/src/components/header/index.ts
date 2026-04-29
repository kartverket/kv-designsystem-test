import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNavList } from './HeaderNavList';
import { HeaderActions } from './HeaderActions';

type HeaderProps = typeof HeaderRoot & {
  NavList: typeof HeaderNavList;
  NavItem: typeof HeaderNavItem;
  Actions: typeof HeaderActions;
};

// Object.assign gjør at Header.Item kan brukes som underkomponent
const Header: HeaderProps = Object.assign(HeaderRoot, {
  NavList: HeaderNavList,
  NavItem: HeaderNavItem,
  Actions: HeaderActions,
});

Header.NavList.displayName = 'Header.NavList';
Header.NavItem.displayName = 'Header.NavItem';
Header.Actions.displayName = 'Header.Actions';

export type { HeaderProps } from './Header';
export type { HeaderNavListProps } from './HeaderNavList';
export type { HeaderNavItemProps } from './HeaderNavItem';
export type { HeaderActionsProps } from './HeaderActions';
export { Header };
