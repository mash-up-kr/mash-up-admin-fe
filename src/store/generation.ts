import { atom } from 'recoil';
import { GenerationResponse } from '@/types';

export const $generations = atom<GenerationResponse>({
  key: 'generations',
  default: [],
});
