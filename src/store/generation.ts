import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { GenerationResponse } from '@/types';

const { persistAtom } = recoilPersist({ key: 'generationNumber', storage: sessionStorage });

export const $generations = atom<GenerationResponse>({
  key: 'generations',
  default: [],
});

export const $generationNumber = atom<number | undefined>({
  key: 'generationNumber',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
