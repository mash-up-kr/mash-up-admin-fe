import http from '@/api/core';
import {
  ApplicationFormResponse,
  BaseResponse,
  ApplicationFormCreateRequest,
  ApplicationFormUpdateRequest,
} from '@/types';

export const createApplicationForm = (
  data: ApplicationFormCreateRequest,
): Promise<BaseResponse<ApplicationFormResponse>> =>
  http.post({
    url: '/application-forms',
    data,
  });

export const getApplicationFormDetail = (
  applicationFormId: string,
): Promise<BaseResponse<ApplicationFormResponse>> =>
  http.get({ url: `/application-forms/${applicationFormId}` });

export const updateApplicationForm = (
  applicationFormId: string,
  data: ApplicationFormUpdateRequest,
): Promise<BaseResponse<ApplicationFormResponse>> =>
  http.put({
    url: `/application-forms/${applicationFormId}`,
    data,
  });
