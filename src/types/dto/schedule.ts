import { SchedulePlatformType } from '@/utils';
import { ValueOf } from '..';

export const ScheduleStatus = {
  ADMIN_ONLY: 'ADMIN_ONLY',
  PUBLIC: 'PUBLIC',
} as const;

export interface ScheduleRequest {
  generationNumber?: number;
  page?: number;
  size?: number;
  sort?: string;
  scheduleType: ValueOf<typeof SchedulePlatformType>;
}

export interface EventCreateRequest {
  endedAt: string;
  name: string;
  startedAt: string;
  contentsCreateRequests: ContentsCreateRequest[];
}

export interface ContentsCreateRequest {
  title: string;
  startedAt: string;
  desc: string;
}

interface Location {
  roadAddress?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  detailAddress?: string;
}

export interface ScheduleCreateRequest extends Location {
  generationNumber?: number;
  scheduleType: ValueOf<typeof SchedulePlatformType>;
  endedAt: string;
  name: string;
  startedAt: string;
  eventsCreateRequests: EventCreateRequest[];
  notice?: string;
}

export interface ScheduleUpdateRequest extends Location {
  generationNumber?: number;
  scheduleType: ValueOf<typeof SchedulePlatformType>;
  endedAt: string;
  name: string;
  startedAt: string;
  eventsCreateRequests: EventCreateRequest[];
  notice?: string;
}

export interface ScheduleResponse {
  endedAt: string;
  generationNumber: number;
  scheduleType: ValueOf<typeof SchedulePlatformType>;
  name: string;
  scheduleId: number;
  createdAt: string;
  startedAt: string;
  publishedAt?: string;
  eventList: Session[];
  status: ValueOf<typeof ScheduleStatus>;
  location: { detailAddress: string } & Omit<Location, 'detailAddress'>;
  notice: string;
}

export interface QRCodeRequest {
  scheduleId: number;
  eventId: number;
  attendanceCheckStartedAt: string;
  attendanceCheckEndedAt: string;
  latenessCheckEndedAt: string;
}

export interface QRCodeResponse {
  qrCodeUrl: string;
}

export interface Session {
  contentList: Content[];
  endedAt: string;
  eventId: number;
  startedAt: string;
  eventName: string;
}

export interface Content {
  content: string;
  contentId: number;
  startedAt: string;
  title: string;
}
