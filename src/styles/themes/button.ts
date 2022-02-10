import { css } from '@emotion/react';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button';
import { fonts, colors } from '.';

export const button = {
  size: {
    [ButtonSize.xs]: css`
      ${fonts.regular13};
      padding: 0.8rem 1.8rem;
      line-height: 1.95rem;
      border-radius: 0.9rem;
    `,
    [ButtonSize.sm]: css`
      ${fonts.regular15};
      padding: 0.85rem 2.05rem;
      line-height: 2.25rem;
      border-radius: 1rem;
    `,
    [ButtonSize.md]: css`
      ${fonts.regular16};
      padding: 1.2rem 1.95rem;
      line-height: 2.4rem;
      border-radius: 1.2rem;
    `,
    [ButtonSize.lg]: css`
      ${fonts.regular16};
      padding: 1.6rem 1.95rem;
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
      padding: 0.8rem;
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
