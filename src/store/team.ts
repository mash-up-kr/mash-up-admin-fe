import { atom } from 'recoil';
import { TeamResponse } from '@/types';

export const $teams = atom<TeamResponse>({
  key: 'teams',
  default: [],
});
