import cl from 'clsx/lite';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Flex } from '../layout/Flex';

export type DescriptionListItemProps = HTMLAttributes<HTMLDivElement> & {
  /** Group a DescriptionList.Term followed by a DescriptionList.Description as direct children. */
  children?: ReactNode;
};

export const DescriptionListItem = forwardRef<HTMLDivElement, DescriptionListItemProps>(
  function DescriptionListItem({ children, className, ...rest }, ref) {
    return (
      <Flex
        asChild
        flexWrap="nowrap"
        alignItems="start"
        className={cl('kvds-description-list-item', className)}
      >
        <div ref={ref} {...rest}>
          {children}
        </div>
      </Flex>
    );
  },
);
