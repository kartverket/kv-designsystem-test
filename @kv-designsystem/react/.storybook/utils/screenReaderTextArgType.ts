import type { InputType } from 'storybook/internal/types';

// Digdir has deprecated some screen reader props in favour of data-sr-* attributes on the
// root, e.g. Search.Clear's `aria-label` is replaced by `data-sr-clear` on Search. They aren't
// in the component's props, so docgen can't find them. Add one to Controls by naming the arg
// after the attribute and giving it screenReaderTextArgType. The story passes args on to the
// component as usual, and the component reads the attribute.

// A Controls row for a screen reader text
export const screenReaderTextArgType = ({
  description,
  defaultValue,
}: {
  description: string;
  defaultValue: string;
}): InputType => ({
  description,
  control: { type: 'text' },
  table: { type: { summary: 'string' }, defaultValue: { summary: defaultValue } },
});
