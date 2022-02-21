import { css } from '@emotion/react';

export const fonts = {
  bold46: css`
    font-weight: 700;
    font-size: 4.6rem;
    line-height: 1.5;
  `,
  bold28: css`
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.5;
  `,
  bold24: css`
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 1.5;
  `,
  bold22: css`
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 1.5;
  `,
  regular20: css`
    font-weight: 400;
    font-size: 2rem;
    line-height: 1.6;
  `,
  bold18: css`
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 1.5;
  `,
  bold17: css`
    font-weight: 700;
    font-size: 1.7rem;
    line-height: 1.5;
  `,
  bold16: css`
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.5;
  `,
  medium16: css`
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.5;
  `,
  regular16: css`
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.5;
  `,
  medium15: css`
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.5;
  `,
  regular15: css`
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.5;
  `,
  medium14: css`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.5;
  `,
  regular14: css`
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.5;
  `,
  medium13: css`
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.5;
  `,
  regular13: css`
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.5;
  `,
} as const;

export type FontTheme = typeof fonts;
