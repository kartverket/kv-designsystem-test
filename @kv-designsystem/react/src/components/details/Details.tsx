import { Details, type DetailsProps } from '@digdir/designsystemet-react';

// Fixing Details being displayed as React.ForwardRef in Storybook preview code snippets.
Details.displayName = 'Details';

export type { DetailsProps };
export { Details };
