import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNav } from './HeaderNav';

type HeaderProps = typeof HeaderRoot & {
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
});

Header.Nav.displayName = 'Header.Nav';
Header.NavItem.displayName = 'Header.NavItem';

export type { HeaderProps } from './Header';
export type { HeaderNavProps } from './HeaderNav';
export type { HeaderNavItemProps } from './HeaderNavItem';
export { Header };
