import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fonts: import('@/styles').FontTheme;
    colors: import('@/styles').ColorTheme;
    button: import('@/styles').ButtonTheme;
    input: import('@/styles').InputTheme;
    userProfile: import('@/styles').UserProfileTheme;
    a11y: import('@/styles').A11yTheme;
    navigation: import('@/styles').NavigationTheme;
  }
}
