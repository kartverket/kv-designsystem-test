import React from 'react';

import { Button as DigdirButton  } from '@digdir/designsystemet-react'
import './button.css';

export interface DigdirButtonProps {
  /** Is this the principal call to action on the page? */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** What background color to use */
  dataColor?: string;
  /** How large should the button be? */
  dataSize?: 'sm' | 'md' | 'lg';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'primary',
  dataColor ='ui-1',
  dataSize = 'md',
  label,
  ...props
}: DigdirButtonProps) => {
  const mode = variant;
return (
    <DigdirButton
      variant={mode}
      data-color={dataColor}
      data-size={dataSize}
      // {...props}
    >
      {label}
    </DigdirButton>
  );
};
