import http from '@/api/core';
import { ApplicationFormResponse, BaseResponse, ApplicationFormCreateRequest } from '@/types';

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
  http.get(`/application-forms/${applicationFormId}`);
