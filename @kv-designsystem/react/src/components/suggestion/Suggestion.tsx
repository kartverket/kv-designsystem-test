import { EXPERIMENTAL_Suggestion as Suggestion, type SuggestionProps } from '@digdir/designsystemet-react';

// Fixing Suggestion being displayed as EXPERIMENTAL_Suggestion in Storybook snippets.
Suggestion.displayName = 'Suggestion';
Suggestion.Clear.displayName = 'Suggestion.Clear';
Suggestion.Empty.displayName = 'Suggestion.Empty';
Suggestion.Input.displayName = 'Suggestion.Input';
Suggestion.List.displayName = 'Suggestion.List';
Suggestion.Option.displayName = 'Suggestion.Option';

export type { SuggestionProps };
export { Suggestion };
