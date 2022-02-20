import {
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import { ValueOf, MemberPositionType, QuestionKindType, Team } from '@/types';

export const ApplicantStatus = {
  active: 'ACTIVE',
  withdrawal: 'WITHDRAWAL',
} as const;

export type ApplicantStatusType = ValueOf<typeof ApplicantStatus>;

export const SmsStatus = {
  created: 'CREATED',
  failure: 'FAILURE',
  success: 'SUCCESS',
};

export type SmsStatusType = ValueOf<typeof SmsStatus>;

export interface ApplicationByIdRequest {
  applicationId: string;
}

export interface ApplicationUpdateResultByIdRequest extends ApplicationByIdRequest {
  applicationResultStatus: ApplicationResultStatusKeyType;
  interviewEndedAt?: string;
  interviewStartedAt: string;
}

export interface ApplicationByIdResponseData extends Array<Team> {
  answers: {
    answerId: number;
    content: string;
    questionId: number;
  }[];
  applicant: {
    applicantId: number;
    createdAt: string;
    email: string;
    name: string;
    phoneNumber: string;
    status: ApplicantStatusType;
    updatedAt: string;
  };
  applicationId: number;
  confirmationStatus: ApplicationConfirmationStatusKeyType;
  createdAt: string;
  questions: {
    content: string;
    description: string;
    maxContentLength: number;
    questionId: number;
    questionType: QuestionKindType;
    required: boolean;
  }[];
  result: {
    interviewEndedAt: string;
    interviewStartedAt: string;
    status: ApplicationResultStatusKeyType;
  };
  smsRequests: {
    notificationContent: string;
    notificationName: string;
    sender: MemberPositionType;
    senderPhoneNumber: string;
    smsRequestId: number;
    status: SmsStatusType;
    team: {
      createdAt: string;
      createdBy: string;
      name: string;
      teamId: number;
      updatedAt: string;
      updatedBy: string;
    };
  }[];
  submittedAt: string;
  team: {
    createdAt: string;
    createdBy: string;
    name: string;
    teamId: number;
    updatedAt: string;
    updatedBy: string;
  };
  updatedAt: string;
}
