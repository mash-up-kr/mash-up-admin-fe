import { ValueOf, KeyOf } from '../helper';
import { MemberPositionType } from './adminMember';

export const EmailStatus = {
  CREATED: '이메일 생성',
  SUCCESS: '발송성공',
  FAIL: '발송실패',
} as const;

export type EmailStatusType = KeyOf<typeof EmailStatus>;

export const EmailTypes = {
  SUBMIT: '제출',
  SCREENING_RESULT: '서류 결과 발표',
  SCREENING_DELAY: '서류 결과 발표 지연',
  INTERVIEW_RESULT: '면접 결과 발표',
  INTERVIEW_DELAY: '면접 결과 발표 지연',
} as const;

export type EmailType = KeyOf<typeof EmailTypes>;

export interface EmailRequest {
  applicationId: number;
  emailRequestId: number;
  recipientEmail: string;
  recipientName: string;
  status: EmailStatusType;
  team: string;
}

export const TemplateNames = {
  제출: 'SUBMIT',
  '서류 결과 발표': 'SCREENING_RESULT',
  '서류 결과 발표 지연': 'SCREENING_DELAY',
  '면접 결과 발표': 'INTERVIEW_RESULT',
  '면접 결과 발표 지연': 'INTERVIEW_DELAY',
} as const;

export type TemplateName = ValueOf<typeof TemplateNames>;

export interface EmailSendingListResponse {
  emailNotificationId: number;
  name: string;
  type: EmailType;
  sendAt: string;
  sender: MemberPositionType;
  successCount: number;
  failureCount: number;
  totalCount: number;
}

export interface EmailSendingListRequest {
  page?: number;
  searchWord?: string;
  size?: number;
  sort?: string;
}

export interface EmailByIdRequest {
  notificationId: string;
}

export interface EmailResponse {
  emailNotificationId: number;
  emailRequests: EmailRequest[];
  failureCount: number;
  name: string;
  sendAt: string;
  sender: MemberPositionType;
  successCount: number;
  totalCount: number;
  type: EmailType;
}

export interface EmailSendRequest {
  applicationIds: number[];
  memo: string;
  templateName: TemplateName;
}
