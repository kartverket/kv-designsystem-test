import { AvatarStack, type AvatarStackProps } from '@digdir/designsystemet-react';

// Fixing AvatarStack being displayed as React.ForwardRef in Storybook preview code snippets.
AvatarStack.displayName = 'AvatarStack';

export type { AvatarStackProps };
export { AvatarStack };
