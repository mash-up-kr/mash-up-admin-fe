import { KeyOf } from '../helper';
import { MemberPositionType } from './adminMember';

export const SmsStatus = {
  CREATED: '메시지 생성',
  FAILURE: '발송실패',
  SUCCESS: '발송성공',
};

export type SmsStatusType = KeyOf<typeof SmsStatus>;

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

export interface SmsSendingListResponse {
  failureCount: number;
  name: string;
  notificationId: number;
  sender: string;
  senderPhoneNumber: string;
  sentAt: string;
  status: SmsStatusType;
  successCount: number;
  totalCount: number;
}

export interface SmsSendingListRequest {
  page?: number;
  searchWord?: string;
  size?: number;
  sort?: string;
}

export interface SmsByIdRequest {
  notificationId: string;
}

export interface SmsResponse {
  content: string;
  failureCount: number;
  name: string;
  notificationId: number;
  sender: string;
  senderPhoneNumber: string;
  sentAt: string;
  smsRequests: SmsContent[];
  status: SmsStatusType;
  successCount: number;
  totalCount: number;
}

export interface SmsRequest {
  applicantIds: number[];
  content: string;
  name: string;
}
