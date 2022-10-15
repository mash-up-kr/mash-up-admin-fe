import { BaseResponse, ScoreHistoryAddRequest, ScoreHistoryCancelRequest } from '@/types';
import http from '@/api/core';

export const postScoreHistoryAdd = (params: ScoreHistoryAddRequest): Promise<BaseResponse<{}>> =>
  http.post({ url: '/score-history/add', data: params });

export const postScoreHistoryCancel = (
  params: ScoreHistoryCancelRequest,
): Promise<BaseResponse<{}>> => http.post({ url: '/score-history/cancel', data: params });
