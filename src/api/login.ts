import api from '@/api/core';
import { Login, LoginParams, Me } from '@/types';
import { throwAPIErrorMessage } from '@/utils';

export const handlePostLogin = ({ username, password }: LoginParams): Promise<Login> =>
  api
    .post({
      url: '/admin-members/login',
      data: {
        username,
        password,
      },
    })
    .catch(throwAPIErrorMessage);

export const handleGetMyInfo = (): Promise<Me> =>
  api
    .get({
      url: '/admin-members/me',
    })
    .catch(throwAPIErrorMessage);
