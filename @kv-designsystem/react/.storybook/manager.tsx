import { addons } from 'storybook/manager-api';
import customTheme from './docs/customTheme';

addons.setConfig({
    // Adjusts the view of the Storybook UI (sidebar, toolbar, background etc.)
    theme: customTheme,
});
