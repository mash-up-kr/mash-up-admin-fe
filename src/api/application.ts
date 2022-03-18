import http from '@/api/core';
import {
  ApplicationByIdRequest,
  ApplicationByIdResponseData,
  MeResponse,
  BaseResponse,
  ApplicationUpdateResultByIdRequest,
  ApplicationUpdateMultipleResultRequest,
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
  http.post({
    url: `/applications/${applicationId}`,
    data: {
      applicationResultStatus,
      interviewEndedAt,
      interviewStartedAt,
    },
  });

export const postUpdateMultipleResult = ({
  applicationIds,
  applicationResultStatus,
}: ApplicationUpdateMultipleResultRequest): Promise<BaseResponse<MeResponse>> =>
  http.post({
    url: `/applications/update-result`,
    data: {
      applicationResultStatus,
      applicationIds,
    },
  });
