import { BaseResponse, TeamResponse } from '@/types';
import http from '@/api/core';

export const getTeams = (generationNumber?: number): Promise<BaseResponse<TeamResponse>> =>
  http.get({
    url: '/teams',
    params: { generationNumber },
  });
