import { BaseResponse, EmailResponse, EmailSendingListRequest, EmailByIdRequest } from '@/types';
import * as api from '@/api';
import { selectorFamilyWithRefresher } from './recoil';

const excludeSubmitEmail = (data: BaseResponse<EmailResponse[]>) => {
  const excludedEmailData = data.data.filter(({ type }) => type !== 'SUBMIT');
  return { ...data, data: excludedEmailData };
};

export const $emailSendingDetail = selectorFamilyWithRefresher<EmailResponse, EmailByIdRequest>({
  key: 'emailSendingDetail',
  get: (params) => async () => {
    const { data } = await api.getEmailById(params);

    return data;
  },
});

export const $emailSendingList = selectorFamilyWithRefresher<
  BaseResponse<EmailResponse[]>,
  EmailSendingListRequest
>({
  key: 'emailSendingList',
  get: (params) => async () => {
    const data = await api.getEmailSendingList(params);
    return excludeSubmitEmail(data);
  },
});
