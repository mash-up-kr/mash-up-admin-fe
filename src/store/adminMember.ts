import { AdminMemberResponse, BaseResponse } from '@/types';
import { selectorFamilyWithRefresher } from './recoil';
import * as api from '@/api';

export const $adminMembers = selectorFamilyWithRefresher<BaseResponse<AdminMemberResponse[]>, {}>({
  key: 'adminMembers',
  get: () => async () => {
    const data = await api.getAdminMembers();
    return data;
  },
});
