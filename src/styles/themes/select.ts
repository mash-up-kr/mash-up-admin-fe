import { css } from '@emotion/react';
import { SelectSize } from '@/components/common/Select/Select.component';
import { fonts } from './fonts';

export const select = {
  size: {
    [SelectSize.xs]: css`
      ${fonts.regular13};

      height: 3.6rem;
    `,
    [SelectSize.sm]: css`
      ${fonts.regular15};

      height: 4rem;
    `,
    [SelectSize.md]: css`
      ${fonts.regular15};

      height: 4.8rem;
    `,
  },
} as const;

export type SelectTheme = typeof select;
