import {
  BaseResponse,
  SmsResponse,
  SmsSendingListResponse,
  SmsSendingListRequest,
  SmsByIdRequest,
} from '@/types';
import * as api from '@/api';
import { selectorFamilyWithRefresher } from './recoil';

export const $smsSendingDetail = selectorFamilyWithRefresher<SmsResponse, SmsByIdRequest>({
  key: 'smsSendingDetail',
  get: (params) => async () => {
    const { data } = await api.getSmsById(params);

    return data;
  },
});

export const $smsSendingList = selectorFamilyWithRefresher<
  BaseResponse<SmsSendingListResponse[]>,
  SmsSendingListRequest
>({
  key: 'smsSendingList',
  get: (params) => async () => {
    const data = await api.getSmsSendingList(params);
    return data;
  },
});
