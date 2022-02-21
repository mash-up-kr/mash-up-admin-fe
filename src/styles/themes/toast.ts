import { css } from '@emotion/react';
import { ToastType } from '@/components/common/Toast/Toast.component';
import { colors } from './colors';

export const toast = {
  type: {
    [ToastType.success]: css`
      background-color: ${colors.green10};
      border: 0.1rem solid ${colors.green40};
    `,
    [ToastType.error]: css`
      background-color: ${colors.red10};
      border: 0.1rem solid ${colors.red40};
    `,
  },
};

export type ToastTheme = typeof toast;
