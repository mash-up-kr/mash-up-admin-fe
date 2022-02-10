import { css } from '@emotion/react';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button.component';
import { fonts, colors } from '.';

export const button = {
  size: {
    [ButtonSize.xs]: css`
      ${fonts.regular13};
      min-width: 6rem;
      height: 3.6rem;
      padding: 0 1.1rem;
      line-height: 1.9rem;
      border-radius: 0.9rem;
    `,
    [ButtonSize.sm]: css`
      ${fonts.regular15};
      min-width: 6.8rem;
      height: 4rem;
      padding: 0 1.1rem;
      line-height: 2.2rem;
      border-radius: 1rem;
    `,
    [ButtonSize.md]: css`
      ${fonts.regular16};
      min-width: 9.6rem;
      height: 4.8rem;
      padding: 0 1.1rem;
      line-height: 2.4rem;
      border-radius: 1.2rem;
    `,
    [ButtonSize.lg]: css`
      ${fonts.regular16};
      min-width: 9.6rem;
      height: 5.6rem;
      padding: 0 1.1rem;
      line-height: 2.4rem;
      border-radius: 1.6rem;
    `,
  },
  shape: {
    [ButtonShape.default]: css`
      color: ${colors.white};
      background-color: ${colors.gray60};

      svg > path {
        stroke: ${colors.white};
      }
    `,
    [ButtonShape.defaultLine]: css`
      color: ${colors.gray70};
      background-color: ${colors.white};
      border-color: ${colors.gray40};

      svg > path {
        stroke: ${colors.gray70};
      }
    `,
    [ButtonShape.primary]: css`
      color: ${colors.white};
      background-color: ${colors.purple70};

      svg > path {
        stroke: ${colors.white};
      }
    `,
    [ButtonShape.primaryLine]: css`
      color: ${colors.purple60};
      background-color: ${colors.purple10};
      border-color: ${colors.purple60};

      svg > path {
        stroke: ${colors.purple60};
      }
    `,
    [ButtonShape.icon]: css`
      width: 4.4rem;
      height: 4.4rem;
      padding: 0 0;
      line-height: 0;
      background-color: ${colors.white};
      border-color: ${colors.gray40};
      border-radius: 0.9rem;

      svg > path {
        stroke: ${colors.gray60};
      }
    `,
  },
} as const;

export type ButtonTheme = typeof button;
