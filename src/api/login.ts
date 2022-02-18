import http from '@/api/core';
import { LoginRequest, LoginResponse, MeResponse } from '@/types';

export const postLogin = ({ username, password }: LoginRequest): Promise<LoginResponse> =>
  http.post({
    url: '/admin-members/login',
    data: {
      username,
      password,
    },
  });

export const getMyInfo = (): Promise<MeResponse> =>
  http.get({
    url: '/admin-members/me',
  });
