import {
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import {
  ValueOf,
  KeyOf,
  Team,
  Question,
  MemberPositionType,
  EmailStatusType,
  TemplateName,
} from '@/types';

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
  SCREENING_TO_BE_DETERMINED: 'SCREENING_TO_BE_DETERMINED',
  SCREENING_FAILED: 'SCREENING_FAILED',
  SCREENING_PASSED: 'SCREENING_PASSED',
  INTERVIEW_TO_BE_DETERMINED: 'INTERVIEW_TO_BE_DETERMINED',
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
  generationNumber?: number;
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
  confirmationStatus: ApplicationConfirmationStatusKeyType;
  result: {
    interviewEndedAt: string;
    interviewStartedAt: string;
    status: ApplicationResultStatusKeyType;
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
  applicationEmailResponses: EmailRequestItem[];
  smsRequests: SmsContent[];
  submittedAt: string;
  team: Team;
  updatedAt: string;
}

export interface EmailRequestItem {
  emailNotificationId: number;
  emailRequestId: number;
  emailRequestStatus: EmailStatusType;
  memo: string;
  sendAt: string;
  senderPosition: MemberPositionType;
  templateName: TemplateName;
}

export interface SmsContent {
  notificationContent?: string;
  notificationName?: string;
  sender?: MemberPositionType;
  senderPhoneNumber?: string;
  recipientName?: string;
  recipientPhoneNumber?: string;
  smsRequestId: number;
  status: SmsStatusType;
  sentAt?: string;
  createdAt: string;
  team: {
    createdAt: string;
    createdBy: string;
    name: string;
    teamId: number;
    updatedAt: string;
    updatedBy: string;
  };
}

export const SmsStatus = {
  CREATED: '메시지 생성',
  FAILURE: '발송실패',
  SUCCESS: '발송성공',
};

export type SmsStatusType = KeyOf<typeof SmsStatus>;
