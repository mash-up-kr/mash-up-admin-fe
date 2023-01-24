import { BaseResponse } from '@/types';
import http from '@/api/core';
import { ScheduleRequest, ScheduleResponse } from '@/types/dto/schedule';

export const getSchedules = (params: ScheduleRequest): Promise<BaseResponse<ScheduleResponse[]>> =>
  http.get({
    url: '/schedules',
    params,
  });
