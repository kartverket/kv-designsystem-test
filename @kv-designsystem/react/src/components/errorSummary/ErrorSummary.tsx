import { ErrorSummary, type ErrorSummaryProps } from '@digdir/designsystemet-react';

// Fixing ErrorSummary being displayed as React.ForwardRef in Storybook preview code snippets.
ErrorSummary.displayName = 'ErrorSummary';

export type { ErrorSummaryProps };
export { ErrorSummary };
