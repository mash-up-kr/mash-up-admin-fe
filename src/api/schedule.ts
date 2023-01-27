import { BaseResponse } from '@/types';
import http from '@/api/core';
import {
  ScheduleRequest,
  ScheduleResponse,
  ScheduleCreateRequest,
  ScheduleUpdateRequest,
} from '@/types/dto';

export const getSchedules = (params: ScheduleRequest): Promise<BaseResponse<ScheduleResponse[]>> =>
  http.get({
    url: '/schedules',
    params,
  });

export const createSchedule = ({
  generationNumber,
  ...data
}: ScheduleCreateRequest): Promise<BaseResponse<ScheduleResponse>> =>
  http.post({ url: '/schedules', data, params: { generationNumber } });

export const getScheduleDetail = (scheduleId: string): Promise<BaseResponse<ScheduleResponse>> =>
  http.get({ url: `/schedules/${scheduleId}` });

// TODO(@mango906): 추후 서버가 http method를 put으로 변경하면 이에 맞게 변경 필요
export const updateSchedule = (
  scheduleId: string,
  data: ScheduleUpdateRequest,
): Promise<BaseResponse<ScheduleResponse>> => http.post({ url: `/schedules/${scheduleId}`, data });
