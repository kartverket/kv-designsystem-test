import { Header as HeaderRoot } from './Header';
import { HeaderNavLink } from './HeaderNavLink';
import { HeaderList } from './HeaderList';

type HeaderProps = typeof HeaderRoot & {
  List: typeof HeaderList;
  NavLink: typeof HeaderNavLink;
};

// Object.assign gjør at Header.Item kan brukes som underkomponent
const Header: HeaderProps = Object.assign(HeaderRoot, {
  List: HeaderList,
  NavLink: HeaderNavLink,
});

Header.List.displayName = 'Header.List';
Header.NavLink.displayName = 'Header.NavLink';

export type { HeaderProps } from './Header';
export type { HeaderListProps } from './HeaderList';
export type { HeaderNavLinkProps } from './HeaderNavLink';
export { Header };
