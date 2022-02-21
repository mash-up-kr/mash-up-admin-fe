import http from '@/api/core';
import { BaseResponse } from '@/types';
import { SmsRequest, SmsResponse } from '@/types/dto/sms';

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
