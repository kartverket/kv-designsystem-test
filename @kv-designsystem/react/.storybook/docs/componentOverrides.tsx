import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { List } from 'src/components/list/List';
import { Link } from 'src/components/link/Link';
import { Table } from 'src/components/table/Table';
import type { MdxComponentOverrides } from '../types/storybook';
import componentStyles from './componentOverrides.module.css';
import { getPath } from '.storybook/utils/getPath';

const headingConfig = [
  { level: 1, size: 'xl', marginBlock: '0 var(--ds-size-6)' },
  { level: 2, size: 'md' },
  { level: 3, size: 'xs' },
  { level: 4, size: '2xs' },
  { level: 5, size: 'xs' },
  { level: 6, size: 'xs' },
] as const;

const createHeadingOverrides = (): Partial<MdxComponentOverrides> => {
  const overrides: Partial<MdxComponentOverrides> = {};

  headingConfig.forEach((config) => {
    const {level, size } = config;
    const marginBlock = 'marginBlock' in config ? config.marginBlock : 'var(--ds-size-6)';
    const key = `h${level}` as const;
    overrides[key as keyof MdxComponentOverrides] = (props) => (
      <Heading
        data-size={size}
        className="sb-unstyled"
        {...props}
        level={level}
        style={{ marginBlock: marginBlock }}
      />
    );
  });
  return overrides;
};

export const componentOverrides: MdxComponentOverrides = {
  ...createHeadingOverrides(),
  p: (props) => (
    <Paragraph
      {...props}
      className={`sb-unstyled`}
    />
  ),
  ol: (props) => <List.Ordered {...props} className={`sb-unstyled`} />,
  ul: (props) => <List.Unordered {...props} className={`sb-unstyled`} />,
  li: (props) => (
    <List.Item
      {...props}
      className="sb-unstyled"
      style={{ marginBlockStart: 'var(--ds-size-0)' }}
    />
  ),
  a: (props) => (
    <Link {...props} href={getPath(props.href)}>
      {props.children}
    </Link>
  ),
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
    <Table {...props} border={false} zebra className="sb-unstyled" style={{ width: '100%' }} />
  ),
  thead: (props) => <Table.Head {...props} className="sb-unstyled" />,
  tbody: (props) => <Table.Body {...props} className="sb-unstyled" />,
  tr: (props) => <Table.Row {...props} className="sb-unstyled" />,
  th: (props) => <Table.HeaderCell {...props} className="sb-unstyled" />,
  td: (props) => <Table.Cell {...props} className="sb-unstyled" />,
  dl: (props) => <dl {...props} className="sb-unstyled" />,
  code: (props) => <code {...props} className={`sb-unstyled ${componentStyles.code}`} />,
};
