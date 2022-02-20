import { BaseResponse, TeamResponse } from '@/types';
import http from '@/api/core';

export const getTeams = (): Promise<BaseResponse<TeamResponse>> =>
  http.get({
    url: '/teams',
  });
