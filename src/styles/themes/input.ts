import { css } from '@emotion/react';
import { InputSize } from '@/components/common/Input/Input.component';
import { fonts } from './fonts';

export const input = {
  size: {
    [InputSize.xs]: css`
      ${fonts.regular13};
      padding: 0.8rem 1.2rem;
    `,
    [InputSize.sm]: css`
      ${fonts.regular15};
      padding: 0.8rem 1.2rem;
    `,
    [InputSize.md]: css`
      ${fonts.regular15};
      padding: 1.2rem 1.4rem;
    `,
  },
} as const;

export type InputTheme = typeof input;
