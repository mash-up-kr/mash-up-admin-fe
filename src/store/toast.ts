import { atom } from 'recoil';
import { ToastProps as Toast } from '@/components/common/Toast/Toast.component';

export const $toast = atom<Toast | undefined>({
  key: 'toast',
  default: undefined,
});
