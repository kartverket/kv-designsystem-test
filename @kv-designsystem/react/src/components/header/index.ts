import { Header as HeaderRoot } from './Header';
import { HeaderNavItem } from './HeaderNavItem';
import { HeaderNav } from './HeaderNav';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderMenu, HeaderSearchDialog } from './HeaderDialog';
import { HeaderActionsList } from './HeaderActionsList';
import { HeaderSearchButton } from './HeaderSearchButton';
import { HeaderPopover } from './HeaderPopover';

type HeaderProps = typeof HeaderRoot & {
  ActionsList: typeof HeaderActionsList;
  Menu: typeof HeaderMenu;
  MenuButton: typeof HeaderMenuButton;
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
  SearchButton: typeof HeaderSearchButton;
  SearchDialog: typeof HeaderSearchDialog;
  Popover: typeof HeaderPopover;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  ActionsList: HeaderActionsList,
  Menu: HeaderMenu,
  MenuButton: HeaderMenuButton,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
  SearchButton: HeaderSearchButton,
  SearchDialog: HeaderSearchDialog,
  Popover: HeaderPopover,
});

Header.ActionsList.displayName = 'Header.ActionsList';
Header.Menu.displayName = 'Header.Menu';
Header.MenuButton.displayName = 'Header.MenuButton';
Header.Nav.displayName = 'Header.Nav';
Header.NavItem.displayName = 'Header.NavItem';
Header.SearchButton.displayName = 'Header.SearchButton';
Header.SearchDialog.displayName = 'Header.SearchDialog';
Header.Popover.displayName = 'Header.Popover';

export type { HeaderProps } from './Header';
export type { HeaderDialogProps } from './HeaderDialog';
export type { HeaderActionsListProps } from './HeaderActionsList';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderNavProps } from './HeaderNav';
export type { HeaderNavItemProps } from './HeaderNavItem';
export type { HeaderPopoverProps } from './HeaderPopover';
export { Header };
