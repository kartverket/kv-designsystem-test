import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNav } from './HeaderNav';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderDialog } from './HeaderDialog';
import { HeaderActionsList } from './HeaderActionsList';
import { HeaderSearchButton } from './HeaderSearchButton';

type HeaderProps = typeof HeaderRoot & {
  ActionsList: typeof HeaderActionsList;
  Menu: typeof HeaderDialog;
  MenuButton: typeof HeaderMenuButton;
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
  SearchButton: typeof HeaderSearchButton;
  SearchDialog: typeof HeaderDialog;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  ActionsList: HeaderActionsList,
  Menu: HeaderDialog,
  MenuButton: HeaderMenuButton,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
  SearchButton: HeaderSearchButton,
  SearchDialog: HeaderDialog,
});

Header.ActionsList.displayName = 'Header.ActionsList';
Header.Menu.displayName= 'Header.Menu';
Header.MenuButton.displayName= 'Header.MenuButton';
Header.Nav.displayName = 'Header.Nav';
Header.NavItem.displayName = 'Header.NavItem';
Header.SearchButton.displayName = 'Header.SearchButton';
Header.SearchDialog.displayName= 'Header.SearchDialog';

export type { HeaderProps } from './Header';
export type { HeaderDialogProps } from './HeaderDialog';
export type { HeaderActionsListProps } from './HeaderActionsList';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderNavProps } from './HeaderNav';
// export type { HeaderNavItemProps } from './HeaderNavItem';
export { Header };
