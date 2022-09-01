import { css } from '@emotion/react';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button.component';
import { fonts, colors } from '.';

export const button = {
  size: {
    [ButtonSize.xs]: css`
      ${fonts.medium13};
      min-width: 6rem;
      height: 3.6rem;
      padding: 0 1.1rem;
      line-height: 1.9rem;
      border-radius: 0.9rem;
    `,
    [ButtonSize.sm]: css`
      ${fonts.medium15};
      min-width: 6.8rem;
      height: 4rem;
      padding: 0 1.1rem;
      line-height: 2.2rem;
      border-radius: 1rem;
    `,
    [ButtonSize.md]: css`
      ${fonts.medium16};
      min-width: 9.6rem;
      height: 4.8rem;
      padding: 0 1.1rem;
      line-height: 2.4rem;
      border-radius: 1.2rem;
    `,
    [ButtonSize.lg]: css`
      ${fonts.medium16};
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

      &:hover {
        background-color: ${colors.gray70};
      }

      &:disabled {
        background-color: ${colors.gray40};
      }

      & > svg > path {
        stroke: ${colors.white};
      }
    `,
    [ButtonShape.defaultLine]: css`
      color: ${colors.gray70};
      background-color: ${colors.white};
      border-color: ${colors.gray40};

      &:hover {
        background-color: ${colors.gray10};
      }

      &:disabled {
        color: ${colors.gray50};
        background-color: ${colors.gray10};
        border-color: ${colors.gray30};
      }

      & > svg > path {
        stroke: ${colors.gray70};
      }
    `,
    [ButtonShape.primary]: css`
      color: ${colors.white};
      background-color: ${colors.purple70};

      &:hover {
        background-color: ${colors.purple80};
      }

      &:disabled {
        background-color: ${colors.purple40};
      }

      & > svg > path {
        stroke: ${colors.white};
      }
    `,
    [ButtonShape.primaryLine]: css`
      color: ${colors.purple70};
      background-color: ${colors.purple10};
      border-color: ${colors.purple60};

      &:hover {
        background-color: ${colors.purple20};
      }

      &:disabled {
        color: ${colors.purple40};
        background-color: ${colors.purple40};
        border-color: ${colors.purple20};
      }

      & > svg > path {
        stroke: ${colors.purple60};
      }
    `,
    [ButtonShape.smallIcon]: css`
      width: 3.6rem;
      min-width: auto;
      height: 3.6rem;
      padding: 0 0;
      line-height: 0;
      background-color: ${colors.white};
      border-color: ${colors.gray40};
      border-radius: 0.9rem;

      &:hover {
        background-color: ${colors.gray10};
      }

      & > svg > path {
        stroke: ${colors.gray60};
      }
    `,
    [ButtonShape.icon]: css`
      width: 4.4rem;
      min-width: auto;
      height: 4.4rem;
      padding: 0 0;
      line-height: 0;
      background-color: ${colors.white};
      border-color: ${colors.gray40};
      border-radius: 0.9rem;

      &:hover {
        background-color: ${colors.gray10};
      }

      & > svg > path {
        stroke: ${colors.gray60};
      }
    `,
  },
} as const;

export type ButtonTheme = typeof button;
