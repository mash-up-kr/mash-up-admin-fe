import { BaseResponse, ScoreHistoryAddRequest } from '@/types';
import http from '@/api/core';

export const postScoreHistoryAdd = (params: ScoreHistoryAddRequest): Promise<BaseResponse<any>> =>
  http.post({ url: '/score-history/add', data: params });
