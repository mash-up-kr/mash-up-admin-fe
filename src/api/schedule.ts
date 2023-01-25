import { BaseResponse } from '@/types';
import http from '@/api/core';
import { ScheduleRequest, ScheduleResponse, CreateScheduleRequest } from '@/types/dto';

export const getSchedules = (params: ScheduleRequest): Promise<BaseResponse<ScheduleResponse[]>> =>
  http.get({
    url: '/schedules',
    params,
  });

export const createSchedule = (
  data: CreateScheduleRequest,
): Promise<BaseResponse<ScheduleResponse>> => http.post({ url: '/schedules', data });
