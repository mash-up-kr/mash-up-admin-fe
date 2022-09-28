import { MemberRequest, MemberResponse, BaseResponse } from '@/types';
import http from '@/api/core';

export const getMembers = ({
  generationNumber,
  ...params
}: MemberRequest): Promise<BaseResponse<MemberResponse[]>> =>
  http.get({ url: `/members/${generationNumber}`, params });
