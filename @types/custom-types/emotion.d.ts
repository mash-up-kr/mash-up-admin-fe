import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fonts: import('@/styles').FontTheme;
    colors: import('@/styles').ColorTheme;
    button: import('@/styles').ButtonTheme;
  }
}
