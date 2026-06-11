import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNav } from './HeaderNav';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderDialog } from './HeaderDialog';
import { HeaderActionsList } from './HeaderActionsList';

type HeaderProps = typeof HeaderRoot & {
  Menu: typeof HeaderDialog;
  SearchDialog: typeof HeaderDialog;
  ActionsList: typeof HeaderActionsList;
  MenuButton: typeof HeaderMenuButton;
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  Menu: HeaderDialog,
  SearchDialog: HeaderDialog,
  ActionsList: HeaderActionsList,
  MenuButton: HeaderMenuButton,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
});

Header.Menu.displayName= 'Header.Menu';
Header.SearchDialog.displayName= 'Header.SearchMenu';
Header.ActionsList.displayName = 'Header.ActionsList';
Header.MenuButton.displayName= 'Header.MenuButton';
Header.Nav.displayName = 'Header.Nav';
Header.NavItem.displayName = 'Header.NavItem';

export type { HeaderProps } from './Header';
export type { HeaderDialogProps } from './HeaderDialog';
export type { HeaderActionsListProps } from './HeaderActionsList';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderNavProps } from './HeaderNav';
export type { HeaderNavItemProps } from './HeaderNavItem';
export { Header };
