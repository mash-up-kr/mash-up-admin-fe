import http from '@/api/core';
import { BaseResponse } from '@/types';
import { SmsByIdRequest, SmsRequest, SmsResponse } from '@/types/dto/sms';

export const getSmsById = ({
  notificationId,
}: SmsByIdRequest): Promise<BaseResponse<SmsResponse>> =>
  http.get({
    url: `/notifications/${notificationId}`,
  });

export const getSmsSendingList = (params: SmsRequest): Promise<BaseResponse<SmsResponse[]>> =>
  http.get({
    url: '/notifications',
    params,
  });

export const postSmsSend = ({
  applicantIds,
  content,
  name,
}: SmsRequest): Promise<BaseResponse<SmsResponse>> =>
  http.post({
    url: `/notifications/sms/send`,
    data: {
      applicantIds,
      content,
      name,
    },
  });
