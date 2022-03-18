import {
  ApplicationByIdRequest,
  ApplicationByIdResponseData,
  ApplicationRequest,
  ApplicationResponse,
  BaseResponse,
} from '@/types';
import { selectorFamilyWithRefresher } from './recoil';
import * as api from '@/api';

export const $applicationById = selectorFamilyWithRefresher<
  ApplicationByIdResponseData,
  ApplicationByIdRequest
>({
  key: 'applicationById',
  get: (params) => async () => {
    const { data } = await api.getApplicationById(params);

    return data;
  },
});

export const $applications = selectorFamilyWithRefresher<
  BaseResponse<ApplicationResponse[]>,
  ApplicationRequest
>({
  key: 'applications',
  get: (params) => async () => {
    const data = await api.getApplications(params);
    return data;
  },
});
