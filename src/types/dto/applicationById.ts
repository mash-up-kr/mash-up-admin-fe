import {
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import { ValueOf, QuestionKindType, Team } from '@/types';
import { SmsContent } from './sms';

export const ApplicantStatus = {
  active: 'ACTIVE',
  withdrawal: 'WITHDRAWAL',
} as const;

export type ApplicantStatusType = ValueOf<typeof ApplicantStatus>;

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
  smsRequests: SmsContent[];
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
