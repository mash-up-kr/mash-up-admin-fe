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

export interface ScheduleCreateRequest {
  generationNumber?: number;
  endedAt: string;
  name: string;
  startedAt: string;
  eventsCreateRequests: EventCreateRequest[];
}

export interface ScheduleUpdateRequest {
  generationNumber?: number;
  endedAt: string;
  name: string;
  startedAt: string;
  eventsCreateRequests: EventCreateRequest[];
}

export interface ScheduleResponse {
  endedAt: string;
  generationNumber: number;
  name: string;
  scheduleId: number;
  createdAt: string;
  startedAt: string;
  publishedAt?: string;
  eventList: Session[];
  status: ValueOf<typeof ScheduleStatus>;
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
