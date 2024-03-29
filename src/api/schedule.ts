import { BaseResponse } from '@/types';
import http from '@/api/core';
import {
  ScheduleRequest,
  ScheduleResponse,
  ScheduleCreateRequest,
  ScheduleUpdateRequest,
  QRCodeRequest,
  QRCodeResponse,
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

export const updateSchedule = (
  scheduleId: string,
  data: ScheduleUpdateRequest,
): Promise<BaseResponse<ScheduleResponse>> => http.put({ url: `/schedules/${scheduleId}`, data });

export const publishSchedule = (scheduleId: string): Promise<BaseResponse<{}>> =>
  http.post({ url: `/schedules/${scheduleId}/publish` });

export const hideSchedule = (scheduleId: string): Promise<BaseResponse<{}>> =>
  http.post({ url: `/schedules/${scheduleId}/hide` });

export const deleteSchedule = (scheduleId: string): Promise<BaseResponse<{}>> =>
  http.delete({ url: `/schedules/${scheduleId}` });

export const createQRCode = ({
  scheduleId,
  eventId,
  attendanceCheckStartedAt,
  attendanceCheckEndedAt,
  latenessCheckEndedAt,
}: QRCodeRequest): Promise<BaseResponse<QRCodeResponse>> =>
  http.post({
    url: `/schedules/${scheduleId}/event/${eventId}/qr`,
    data: { attendanceCheckStartedAt, attendanceCheckEndedAt, latenessCheckEndedAt },
  });
