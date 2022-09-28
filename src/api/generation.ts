import { BaseResponse, GenerationResponse } from '@/types';

import http from '@/api/core';

export const getGenerations = (): Promise<BaseResponse<GenerationResponse>> =>
  http.get({ url: '/generations' });
