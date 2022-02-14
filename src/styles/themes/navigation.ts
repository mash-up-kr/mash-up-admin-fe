import { css } from '@emotion/react';
import { NavigationSize } from '@/components/common/Navigation/Navigation.component';

export const navigation = {
  size: {
    [NavigationSize.sm]: css`
      width: 8rem;
      height: 4rem;

      &:not(:first-of-type) {
        margin-left: 0.8rem;
      }
    `,
    [NavigationSize.md]: css`
      width: 12rem;
      height: 7rem;

      &:not(:first-of-type) {
        margin-left: 2rem;
      }
    `,
  },
} as const;

export type NavigationTheme = typeof navigation;
