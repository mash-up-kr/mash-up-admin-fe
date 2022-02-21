import React from 'react';
import { useRecoilState } from 'recoil';
import { ValueOf } from '@/types';
import * as Styled from './Toast.styled';
import Success from '@/assets/svg/success-24.svg';
import Error from '@/assets/svg/error-24.svg';
import CloseRed from '@/assets/svg/close-red-32.svg';
import CloseGreen from '@/assets/svg/close-green-32.svg';
import { $toast } from '@/store';

export const ToastType = {
  success: 'success',
  error: 'error',
} as const;

export interface ToastProps {
  message: string;
  type: ValueOf<typeof ToastType>;
}

const icon = {
  [ToastType.success]: <Success />,
  [ToastType.error]: <Error />,
};

const closeButton = {
  [ToastType.success]: <CloseGreen />,
  [ToastType.error]: <CloseRed />,
};

const Toast = () => {
  const [toast, setToast] = useRecoilState($toast);

  if (!toast) {
    return null;
  }

  const { type, message } = toast;

  return (
    <Styled.Toast type={type}>
      {icon[type]}
      <span>{message}</span>
      <button type="button" onClick={() => setToast(undefined)}>
        {closeButton[type]}
      </button>
    </Styled.Toast>
  );
};

export default Toast;
