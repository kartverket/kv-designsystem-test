import type { ComponentProps, FunctionComponent, ReactNode } from 'react';
import { Suggestion } from '../Suggestion';

// Docgen only shows `children` when it has a description. These components only exist to
// add one. Omit removes React's own `children`, which has none and would hide ours.

const SuggestionList: FunctionComponent<
  Omit<ComponentProps<typeof Suggestion.List>, 'children'> & {
    /** Should be one or more Suggestion.Option elements, and optionally a Suggestion.Empty */
    children?: ReactNode;
  }
> = () => null;

const SuggestionOption: FunctionComponent<
  Omit<ComponentProps<typeof Suggestion.Option>, 'children'> & {
    /** Text for this option */
    children?: ReactNode;
  }
> = () => null;

const SuggestionEmpty: FunctionComponent<
  Omit<ComponentProps<typeof Suggestion.Empty>, 'children'> & {
    /** Text shown when no options match */
    children?: ReactNode;
  }
> = () => null;

// Shows the props of Suggestion's subcomponents in tabs in Controls. See tsconfig.docgen.json.
export const subcomponents = {
  'Suggestion.Input': Suggestion.Input,
  'Suggestion.Clear': Suggestion.Clear,
  'Suggestion.Toggle': Suggestion.Toggle,
  'Suggestion.List': SuggestionList,
  'Suggestion.Option': SuggestionOption,
  'Suggestion.Empty': SuggestionEmpty,
};
