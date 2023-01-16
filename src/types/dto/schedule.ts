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

export interface ScheduleResponse {
  endedAt: string;
  generationNumber: number;
  name: string;
  scheduleId: number;
  createdAt: string;
  startedAt: string;
  publishedAt?: string;
  eventList: Event[];
  status: ValueOf<typeof ScheduleStatus>;
}

interface Event {
  contentList: Content[];
  endedAt: string;
  eventId: number;
  startedAt: string;
}

export interface Content {
  content: string;
  contentId: number;
  startedAt: string;
  title: string;
}
