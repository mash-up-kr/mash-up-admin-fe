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

// MEMO(@mango906): 서버는 세션에 대해 Event라는 이름을 가지고 있으므로 Event 대신 Session
export interface Session {
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

export interface CreateScheduleRequest {
  generationNumber?: number;
  endedAt: string;
  name: string;
  startedAt: string;
  eventsCreateRequests: Session;
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
