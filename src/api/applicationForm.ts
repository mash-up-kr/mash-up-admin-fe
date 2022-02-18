import http from '@/api/core';
import { ApplicationFormResponse, BaseResponse, CreateApplicationFormRequest } from '@/types';

export const createApplicationForm = (
  data: CreateApplicationFormRequest,
): Promise<BaseResponse<ApplicationFormResponse>> =>
  http.post({
    url: '/application-forms',
    data,
  });
