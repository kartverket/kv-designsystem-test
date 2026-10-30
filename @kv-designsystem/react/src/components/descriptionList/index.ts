import { DescriptionList as DescriptionListRoot } from './DescriptionList';
import { DescriptionListItem } from './DescriptionListItem';
import { DescriptionListTerm } from './DescriptionListTerm';
import { DescriptionListDescription } from './DescriptionListDescription';

export const DescriptionList = Object.assign(DescriptionListRoot, {
  Item: DescriptionListItem,
  Term: DescriptionListTerm,
  Description: DescriptionListDescription,
});

DescriptionList.Item.displayName = 'DescriptionList.Item';
DescriptionList.Term.displayName = 'DescriptionList.Term';
DescriptionList.Description.displayName = 'DescriptionList.Description';

export type { DescriptionListProps } from './DescriptionList';
export type { DescriptionListItemProps } from './DescriptionListItem';
export type { DescriptionListTermProps } from './DescriptionListTerm';
export type { DescriptionListDescriptionProps } from './DescriptionListDescription';
