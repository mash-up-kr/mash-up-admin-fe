import http from '@/api/core';
import {
  BaseResponse,
  EmailResponse,
  EmailByIdRequest,
  EmailSendRequest,
  EmailSendingListRequest,
} from '@/types';

export const getEmailById = ({
  notificationId,
}: EmailByIdRequest): Promise<BaseResponse<EmailResponse>> =>
  http.get({
    url: `/email/${notificationId}`,
  });

export const getEmailSendingList = (
  params: EmailSendingListRequest,
): Promise<BaseResponse<EmailResponse[]>> =>
  http.get({
    url: '/email',
    params,
  });

export const postEmailSend = ({
  applicationIds,
  memo,
  templateName,
}: EmailSendRequest): Promise<BaseResponse<EmailResponse>> =>
  http.post({
    url: `/email/send`,
    data: {
      applicationIds,
      memo,
      templateName,
    },
  });
