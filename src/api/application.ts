import http from '@/api/core';
import {
  ApplicationByIdRequest,
  ApplicationByIdResponseData,
  MeResponse,
  BaseResponse,
  ApplicationUpdateResultByIdRequest,
  ApplicationUpdateMultipleResultRequest,
  ApplicationRequest,
  ApplicationResponse,
  ApplicationResultStatusInDto,
  ApplicationConfirmationStatusInDto,
} from '@/types';

export const getApplicationById = ({
  applicationId,
}: ApplicationByIdRequest): Promise<BaseResponse<ApplicationByIdResponseData>> =>
  http.get({
    url: `/applications/${applicationId}`,
  });

export const getApplications = (
  params: ApplicationRequest,
): Promise<BaseResponse<ApplicationResponse[]>> =>
  http.get({
    url: '/applications',
    params,
  });

export const postUpdateResult = async ({
  applicationId,
  applicationResultStatus,
  interviewEndedAt,
  interviewStartedAt,
}: ApplicationUpdateResultByIdRequest): Promise<BaseResponse<MeResponse>> => {
  const STATUS = {
    [ApplicationResultStatusInDto.SCREENING_PASSED]:
      ApplicationConfirmationStatusInDto.INTERVIEW_CONFIRM_WAITING,
    [ApplicationResultStatusInDto.INTERVIEW_PASSED]:
      ApplicationConfirmationStatusInDto.FINAL_CONFIRM_WAITING,
  }[applicationResultStatus as string];

  if (STATUS) {
    await http.post({
      url: `${process.env.BASE_URL_RECRUIT}/api/vi/applications/${applicationId}/confirm`,
      data: {
        status: STATUS,
      },
    });
  }

  return http.post({
    url: `/applications/${applicationId}/update-result`,
    data: {
      applicationResultStatus,
      interviewEndedAt,
      interviewStartedAt,
    },
  });
};

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
