import { 
    Chip, 
    ChipButton, 
    ChipCheckbox,
    ChipRadio,
    ChipRemovable,
    type ChipButtonProps,
    type ChipCheckboxProps,
    type ChipRadioProps,
    type ChipRemovableProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Chip.Button.displayName = 'Chip.Button';

export type {
  ChipButtonProps,
  ChipCheckboxProps,
  ChipRadioProps,
  ChipRemovableProps,
};
export { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable };
