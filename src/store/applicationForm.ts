import { ApplicationFormResponse, ApplicationFormRequest, BaseResponse } from '@/types';
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

export const $applicationForms = selectorFamilyWithRefresher<
  BaseResponse<ApplicationFormResponse[]>,
  ApplicationFormRequest
>({
  key: 'applications',
  get: (params) => async () => {
    const data = await api.getApplicationForms(params);
    return data;
  },
});
