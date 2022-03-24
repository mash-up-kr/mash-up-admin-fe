import { ValueOf, Team, Question } from '@/types';
import { SmsContent } from './sms';

export const ApplicationConfirmationStatusInDto = {
  NOT_APPLICABLE: 'NOT_APPLICABLE',
  INTERVIEW_CONFIRM_WAITING: 'INTERVIEW_CONFIRM_WAITING',
  INTERVIEW_CONFIRM_ACCEPTED: 'INTERVIEW_CONFIRM_ACCEPTED',
  INTERVIEW_CONFIRM_REJECTED: 'INTERVIEW_CONFIRM_REJECTED',
  FINAL_CONFIRM_WAITING: 'FINAL_CONFIRM_WAITING',
  FINAL_CONFIRM_ACCEPTED: 'FINAL_CONFIRM_ACCEPTED',
  FINAL_CONFIRM_REJECTED: 'FINAL_CONFIRM_REJECTED',
  TO_BE_DETERMINED: 'TO_BE_DETERMINED',
} as const;

export const ApplicationResultStatusInDto = {
  NOT_RATED: 'NOT_RATED',
  SCREENING_TBD: 'SCREENING_TO_BE_DETERMINED',
  SCREENING_FAILED: 'SCREENING_FAILED',
  SCREENING_PASSED: 'SCREENING_PASSED',
  INTERVIEW_FAILED: 'INTERVIEW_FAILED',
  INTERVIEW_PASSED: 'INTERVIEW_PASSED',
} as const;

export type ApplicationConfirmationStatusInDtoType = ValueOf<
  typeof ApplicationConfirmationStatusInDto
>;
export type ApplicationResultStatusInDtoType = ValueOf<typeof ApplicationResultStatusInDto>;

export interface ApplicationRequest {
  confirmStatus?: string;
  page?: number;
  resultStatus?: string;
  searchWord?: string;
  size?: number;
  sort?: string;
  teamId?: number;
}

export interface ApplicationResponse {
  applicationId: number;
  applicant: {
    applicantId: number;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  confirmationStatus: string;
  result: {
    interviewEndedAt: string;
    interviewStartedAt: string;
    status: string;
  };
  team: Team;
  createdAt: string;
  updatedAt: string;
  submittedAt: string;
}

export const ApplicantStatus = {
  active: 'ACTIVE',
  withdrawal: 'WITHDRAWAL',
} as const;

export type ApplicantStatusType = ValueOf<typeof ApplicantStatus>;

export interface Answer {
  answerId: number;
  content: string;
  questionId: number;
}

export interface ApplicationByIdRequest {
  applicationId: string;
}

export interface ApplicationUpdateResultByIdRequest extends ApplicationByIdRequest {
  applicationResultStatus: ApplicationResultStatusInDtoType;
  interviewEndedAt?: string;
  interviewStartedAt?: string;
}

export interface ApplicationUpdateMultipleResultRequest {
  applicationIds: number[];
  applicationResultStatus: ApplicationResultStatusInDtoType;
}

export interface ApplicationByIdResponseData extends Array<Team> {
  answers: Answer[];
  applicant: {
    applicantId: number;
    birthdate: string;
    createdAt: string;
    department: string;
    email: string;
    name: string;
    phoneNumber: string;
    residence: string;
    status: ApplicantStatusType;
    updatedAt: string;
  };
  applicationId: number;
  confirmationStatus: ApplicationConfirmationStatusInDtoType;
  createdAt: string;
  questions: Question[];
  result: {
    interviewEndedAt: string;
    interviewStartedAt: string;
    status: ApplicationResultStatusInDtoType;
  };
  smsRequests: SmsContent[];
  submittedAt: string;
  team: Team;
  updatedAt: string;
}
