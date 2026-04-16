import { create } from 'storybook/theming';
import '../../.storybook/style.css';

export default create({
    brandImage: './img/KV_Logo_Horisontal.svg', //TODO: logo has to adjust to light/dark mode
    fontBase: 'var(--ds-font-family), sans-serif',
    base: 'light', // TODO: make storybook available for both dark and lightmode
    colorSecondary: '#1a833b', // TODO: adjust to chosen theme, gives color to eg. active buttons, blue='#1A589F'
});
