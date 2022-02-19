import http from '@/api/core';
import { BaseResponse, ApplicationResponse } from '@/types';

export const getApplications = (params: any): Promise<BaseResponse<ApplicationResponse[]>> =>
  http.get({
    url: '/applications',
    params,
  });
