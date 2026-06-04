import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNav } from './HeaderNav';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderMenu } from './HeaderMenu';
import { HeaderActionsList } from './HeaderActionsList';

type HeaderProps = typeof HeaderRoot & {
  Menu: typeof HeaderMenu;
  ActionsList: typeof HeaderActionsList;
  MenuButton: typeof HeaderMenuButton;
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  Menu: HeaderMenu,
  ActionsList: HeaderActionsList,
  MenuButton: HeaderMenuButton,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
});

Header.Menu.displayName= 'Header.Menu';
Header.ActionsList.displayName = 'Header.ActionsList';
Header.MenuButton.displayName= 'Header.MenuButton';
Header.Nav.displayName = 'Header.Nav';
Header.NavItem.displayName = 'Header.NavItem';

export type { HeaderProps } from './Header';
export type { HeaderMenuProps } from './HeaderMenu';
export type { HeaderActionsListProps } from './HeaderActionsList';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderNavProps } from './HeaderNav';
export type { HeaderNavItemProps } from './HeaderNavItem';
export { Header };
