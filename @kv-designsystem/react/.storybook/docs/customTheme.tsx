import { create } from 'storybook/theming';

export default create({
    brandImage: '../../assets/img/KV_Logo_Horisontal.svg', //TODO: logo has to adjust to light/dark mode
    fontBase: '"Inter", sans-serif',
    //Colors
    base: 'light', // TODO: make storybook available for both dark and lightmode
    colorSecondary: '#1a833b', // TODO: adjust to chosen theme, gives color to eg. active buttons, blue='#1A589F'
    // appBg: 'var(--ds-color-neutral-background-tinted)',
    // appPreviewBg: 'var(--ds-color-neutral-background-default)',
    // appContentBg: 'var(--ds-color-neutral-background-default)',
});

// export const lightTheme = create({
//     brandImage: '../../assets/img/KV_Logo_Horisontal.svg',
//     fontBase: '"Mulish", sans-serif',
//     //Colors
//     base: 'light',
//     colorSecondary: '#1a833b', // TODO: adjust to chosen theme, gives color to eg. active buttons, '#1a833b'
// });

// export const darkTheme = create({
//     brandImage: '../../assets//img/KV_Logo_Horisontal_Negativ.svg',
//     fontBase: '"Mulish", sans-serif',
//     base: 'dark',
//     colorSecondary: '#1a833b',
// });
