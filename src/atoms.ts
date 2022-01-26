import { atom } from 'recoil';

export const countState = atom<number>({
  key: 'CountState',
  default: 0,
});
