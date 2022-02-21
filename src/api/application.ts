import http from '@/api/core';
import {
  ApplicationByIdRequest,
  ApplicationByIdResponseData,
  MeResponse,
  BaseResponse,
  ApplicationUpdateResultByIdRequest,
} from '@/types';

export const getApplicationById = ({
  applicationId,
}: ApplicationByIdRequest): Promise<BaseResponse<ApplicationByIdResponseData>> =>
  http.get({
    url: `/applications/${applicationId}`,
  });

export const postUpdateResult = ({
  applicationId,
  applicationResultStatus,
  interviewEndedAt,
  interviewStartedAt,
}: ApplicationUpdateResultByIdRequest): Promise<BaseResponse<MeResponse>> =>
  http.get({
    url: `/applications/${applicationId}`,
    data: {
      applicationResultStatus,
      interviewEndedAt,
      interviewStartedAt,
    },
  });
