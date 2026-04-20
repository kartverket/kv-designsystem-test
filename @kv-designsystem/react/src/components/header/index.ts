import { Header as HeaderRoot } from './Header';
import { HeaderButton } from './HeaderButton';
import { HeaderList } from './HeaderList';

type HeaderProps = typeof HeaderRoot & {
  List: typeof HeaderList;
  Button: typeof HeaderButton;
};

// Object.assign gjør at Header.Item kan brukes som underkomponent
const Header: HeaderProps = Object.assign(HeaderRoot, {
  List: HeaderList,
  Button: HeaderButton,
});

Header.List.displayName = 'Header.List';
Header.Button.displayName = 'Header.Button';

export type { HeaderProps } from './Header';
export type { HeaderListProps } from './HeaderList';
export type { HeaderButtonProps } from './HeaderButton';
export { Header };
