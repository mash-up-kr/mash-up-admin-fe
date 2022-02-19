import * as api from '@/api';
import { ApplicationFormResponse, ApplicationFormRequest } from '@/types';
import { selectorFamilyWithRefresher } from './recoil';

export const $applicationForms = selectorFamilyWithRefresher<
  ApplicationFormResponse[],
  ApplicationFormRequest
>({
  key: 'applications',
  get: (params) => async () => {
    const { data } = await api.getApplicationForms(params);
    return data;
  },
});
