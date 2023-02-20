import { BaseResponse } from '@/types';
import { ScheduleRequest, ScheduleResponse } from '@/types/dto/schedule';
import { selectorFamilyWithRefresher } from './recoil';

import * as api from '@/api';

export const $schedules = selectorFamilyWithRefresher<
  BaseResponse<ScheduleResponse[]>,
  ScheduleRequest
>({
  key: 'schedules',
  get: (params) => async () => {
    const data = await api.getSchedules(params);
    return data;
  },
});

export const $scheduleDetail = selectorFamilyWithRefresher<
  ScheduleResponse,
  { scheduleId: string }
>({
  key: 'scheduleDetail',
  get: (params) => async () => {
    const { data } = await api.getScheduleDetail(params.scheduleId);

    return data;
  },
});
