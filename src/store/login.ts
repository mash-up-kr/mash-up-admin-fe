import { atom } from 'recoil';
import { Login } from '@/types/dto';

export const $me = atom<Login | {}>({
  key: 'modal',
  default: {},
});
