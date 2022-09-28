import { BaseResponse, MemberRequest, MemberResponse } from '@/types';
import { selectorFamilyWithRefresher } from './recoil';
import * as api from '@/api';

export const $members = selectorFamilyWithRefresher<BaseResponse<MemberResponse[]>, MemberRequest>({
  key: 'members',
  get: (params) => async () => {
    // MEMO(@mango906): generationNumber가 서버에서 받아오는 정보라 generationNumber가 없을 경우를 대비합니다.
    if (!params.generationNumber) {
      return {
        code: '',
        data: [],
        message: '',
        page: {
          number: params.page ?? 0,
          size: params.size ?? 20,
          totalCount: 0,
        },
      };
    }

    const data = await api.getMembers(params);

    return data;
  },
});
