import { ApplicationFormResponse } from '@/types';
import { selectorFamilyWithRefresher } from './recoil';
import * as api from '@/api';

export const $applicationFormDetail = selectorFamilyWithRefresher<
  ApplicationFormResponse,
  { id: string }
>({
  key: 'applicationFormDetail',
  get: (params) => async () => {
    const { data } = await api.getApplicationFormDetail(params.id);

    return data;
  },
});
