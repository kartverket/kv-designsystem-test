import {
  EXPERIMENTAL_AvatarStack as AvatarStack,
  type AvatarStackProps
} from '@digdir/designsystemet-react';

// Fixing AvatarStacl being displayed as React.ForwardRef in Storybook preview code snippets.
AvatarStack.displayName = 'AvatarStack';

export type { AvatarStackProps };
export { AvatarStack };
