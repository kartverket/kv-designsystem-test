import type { Size } from '@digdir/designsystemet-types';
import type { Preview } from '@storybook/react-vite';
import tokensConfig from '@kv-designsystem/tokens/designsystemet.config.json';

// Digdir types data-size/data-color as e.g. `Size | (string & {})` to allow custom values,
// which docgen can't turn into a list of options. We add the options here instead.

const theme = tokensConfig.themes.green;
const colors = [...Object.keys(theme.colors), ...Object.keys(theme.overrides.severity)];
const sizes: Size[] = ['sm', 'md', 'lg'];

const optionsByProp: Record<string, string[]> = {
  'data-color': colors,
  'data-size': sizes,
};

type ArgTypesEnhancer = NonNullable<Preview['argTypesEnhancers']>[number];

export const designsystemetArgTypes: ArgTypesEnhancer = ({ argTypes }) => {
  for (const [name, options] of Object.entries(optionsByProp)) {
    const argType = argTypes[name];
    // Skip if the component doesn't have the prop, or already has its own options (e.g. Heading)
    if (!argType || argType.options || argType.type?.name === 'enum') continue;

    argTypes[name] = { ...argType, options, control: { type: 'select' } };
  }
  return argTypes;
};
