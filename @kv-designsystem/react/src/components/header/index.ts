import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNav } from './HeaderNav';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderMenu } from './HeaderMenu';

type HeaderProps = typeof HeaderRoot & {
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
  MenuButton: typeof HeaderMenuButton;
  Menu: typeof HeaderMenu;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
  MenuButton: HeaderMenuButton,
  Menu: HeaderMenu,
});

Header.Nav.displayName = 'Header.Nav';
Header.NavItem.displayName = 'Header.NavItem';
Header.MenuButton.displayName= 'Header.MenuButton'
Header.Menu.displayName= 'Header.Menu'

export type { HeaderProps } from './Header';
export type { HeaderNavProps } from './HeaderNav';
export type { HeaderNavItemProps } from './HeaderNavItem';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderMenuProps } from './HeaderMenu';
export { Header };
