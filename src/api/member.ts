import {
  MemberRequest,
  MemberResponse,
  BaseResponse,
  MemberByIdRequest,
  MemberByIdResponseData,
} from '@/types';
import http from '@/api/core';

export const getMembers = ({
  generationNumber,
  ...params
}: MemberRequest): Promise<BaseResponse<MemberResponse[]>> =>
  http.get({ url: `/members/${generationNumber}`, params });

export const getMemberById = ({
  generationNumber,
  memberId,
}: MemberByIdRequest): Promise<BaseResponse<MemberByIdResponseData>> =>
  http.get({ url: `/members/${generationNumber}/${memberId}` });
