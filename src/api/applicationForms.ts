import http from '@/api/core';
import { BaseResponse, ApplicationFormRequest, ApplicationFormResponse } from '@/types';

export const getApplicationForms = (
  params: ApplicationFormRequest,
): Promise<BaseResponse<ApplicationFormResponse[]>> =>
  http.get({
    url: '/application-forms',
    params,
  });
