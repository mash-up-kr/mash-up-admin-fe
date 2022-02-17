import { atom } from 'recoil';
import { Login } from '@/types/dto';

export const $me = atom<Partial<Login>>({
  key: 'modal',
  default: {},
});
