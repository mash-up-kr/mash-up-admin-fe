import {
  ApplicationConfirmationStatusType,
  ApplicationResultStatusType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import { ValueOf, MemberPositionType } from '..';

export interface Team {
  name: string;
  teamId: number;
}

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

export const QuestionKind = {
  multiLineText: 'MULTI_LINE_TEXT',
  singleLineText: 'SINGLE_LINE_TEXT',
};

export type QuestionKindType = ValueOf<typeof QuestionKind>;

export interface ApplicationByIdRequest {
  applicationId: string;
}

export interface ApplicationUpdateResultByIdRequest extends ApplicationByIdRequest {
  applicationResultStatus: ApplicationResultStatusType;
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
  confirmationStatus: ApplicationConfirmationStatusType;
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
    status: ApplicationResultStatusType;
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
