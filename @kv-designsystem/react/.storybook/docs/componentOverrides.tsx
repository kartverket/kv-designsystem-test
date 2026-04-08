import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { List } from 'src/components/list/List';
import { Link } from 'src/components/link/Link';
import { Table } from 'src/components/table/Table';
import type { MdxComponentOverrides } from '../types/storybook';

const getPath = (href: string | undefined): string => {
    if (!href) {
        return '';
    }

    if (href.startsWith('/')) {
        const { origin, pathname } = window.parent.location;

        return `${origin}${pathname}?path=${href}`;
    }
    return href;
}


export const componentOverrides: MdxComponentOverrides = {
  h1: (props) => <Heading data-size="lg" {...props} level={1} />,
  h2: (props) => <Heading data-size="md" {...props} level={2} />,
  h3: (props) => <Heading data-size="sm" {...props} level={3} />,
  h4: (props) => <Heading data-size="xs" {...props} level={4} />,
  h5: (props) => <Heading data-size="xs" {...props} level={5} />,
  h6: (props) => <Heading data-size="xs" {...props} level={6} />,
  p: (props) => (
    <Paragraph
      {...props}
      className={`sb-unstyled`}
    />
  ),
  ol: (props) => (
    <List.Ordered
      {...props}
      className={`sb-unstyled`}
    />
  ),
  ul: (props) => (
    <List.Unordered
      {...props}
      className={`sb-unstyled`}
    />
  ),
  li: (props) => <List.Item {...props} className="sb-unstyled" />,
  a: (props) => <Link {...props} href={getPath(props.href)} >{props.children}</Link>,
//   a: ({ children = '', ...props }) => {
//     // if link starts with /, add current path to link
//     const href = getPath(props.href);

//     return (
//       <Link
//         {...props}
//         href={href}
//         className="sb-unstyled"
//         onClick={handleLinkClick(props.href ?? '')}
//         // Add a data-attribute for use when styling links which include code snippets
//         {...(Children.count(children) === 1 && { 'data-single-child': true })}
//       >
//         {children}
//       </Link>
//     );
//   },
  table: (props) => (
    <Table
      {...props}
      border={false}
      zebra
      className="sb-unstyled"
      style={{ width: '100%' }}
    />
  ),
  thead: (props) => <Table.Head {...props} className="sb-unstyled" />,
  tbody: (props) => <Table.Body {...props} className="sb-unstyled" />,
  tr: (props) => <Table.Row {...props} className="sb-unstyled" />,
  th: (props) => <Table.HeaderCell {...props} className="sb-unstyled" />,
  td: (props) => <Table.Cell {...props} className="sb-unstyled" />,
  dl: (props) => <dl {...props} className="sb-unstyled" />,
};
