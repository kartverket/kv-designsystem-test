import { 
  Card, 
  type CardProps,
  CardBlock,
  type CardBlockProps,
} from '@digdir/designsystemet-react';

// Fixing Card being displayed as React.ForwardRef in Storybook preview code snippets.
Card.displayName = 'Card';

export type { CardProps, CardBlockProps };
export { Card, CardBlock };
