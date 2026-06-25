import { Card, type CardProps } from '@digdir/designsystemet-react';

// Fixes Card being displayed as React.ForwardRef in Storybook preview code snippets.
Card.displayName = 'Card';

export type { CardProps };
export { Card };
