import { css } from '@emotion/react';
import { colors } from './colors';

// TODO:(용재) 추후 원인 파악
export const ToastType = {
  success: 'success',
  error: 'error',
} as const;

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
