import { css } from '@emotion/react';

export const font = {
  kr_46_bold: css`
    font-weight: 700;
    font-size: 4.6rem;
    line-height: 1.5;
  `,
  kr_22_bold: css`
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 1.5;
  `,
  kr_18_bold: css`
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 1.5;
  `,
  kr_16_medium: css`
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.5;
  `,
  kr_15_medium: css`
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.5;
  `,
  kr_15_regular: css`
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.5;
  `,
  kr_14_medium: css`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.5;
  `,
  kr_14_regular: css`
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.5;
  `,
  kr_13_medium: css`
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.5;
  `,
  en_46_extrabold: css`
    font-weight: 800;
    font-size: 4.6rem;
    line-height: 5.6rem;
  `,
  en_26_extrabold: css`
    font-weight: 800;
    font-size: 2.6rem;
    line-height: 3.2rem;
  `,
  en_20_extrabold: css`
    font-weight: 800;
    font-size: 2rem;
    line-height: 2.5rem;
  `,
  en_18_extrabold: css`
    font-weight: 800;
    font-size: 1.8rem;
    line-height: 2.2rem;
  `,
  en_15_extrabold: css`
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 1.8rem;
  `,
} as const;

export type FontTheme = typeof font;
