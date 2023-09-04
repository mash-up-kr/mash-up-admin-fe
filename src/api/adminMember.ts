import { AdminMemberResponse, BaseResponse } from '@/types';
import http from '@/api/core';

export const getAdminMembers = (): Promise<BaseResponse<AdminMemberResponse[]>> =>
  http.get({ url: `/admin-members` });

export const deleteAdminMembers = (adminIds: number[]): Promise<{}> =>
  http.delete({
    url: `/admin-members`,
    data: {
      adminIds,
    },
  });

export const createAdminMember = ({
  username,
  platform,
  password,
}: {
  username: string;
  platform: string;
  password: string;
}): Promise<{}> =>
  http.post({
    url: `/admin-members`,
    data: {
      password,
      position: `${platform.toLocaleUpperCase()}_HELPER`,
      username,
    },
  });

export const resetAdminMembersPassword = (adminIds: number[]) =>
  http.post({
    url: `/admin-members/password/reset`,
    data: {
      adminIds,
      resetPassword: 'admin1234',
    },
  });
