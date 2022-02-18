import http from '@/api/core';
import { LoginRequest, LoginResponse, MeResponse, BaseResponse } from '@/types';

export const postLogin = ({
  username,
  password,
}: LoginRequest): Promise<BaseResponse<LoginResponse>> =>
  http.post({
    url: '/admin-members/login',
    data: {
      username,
      password,
    },
  });

export const getMyInfo = (): Promise<BaseResponse<MeResponse>> =>
  http.get({
    url: '/admin-members/me',
  });
