import dayjs, { Dayjs } from 'dayjs';
import {
  EventCreateRequest,
  ScheduleCreateRequest,
  ScheduleResponse,
  ScheduleStatus,
  ScheduleUpdateRequest,
  ValueOf,
} from '@/types';
import { formatDate, toUtcFormat } from '.';

export const LocationType = {
  OFFLINE: 'offline',
  ONLINE: 'online',
} as const;

export interface ScheduleFormValues {
  name: string;
  generationNumber: number;
  date: Dayjs;
  sessions: EventCreateRequest[];
  locationType: ValueOf<typeof LocationType>;
  locationInfo?: {
    roadAddress: string;
    latitude: string;
    longitude: string;
    detailAddress: string;
  };
}

export const getScheduleStatusText = (status: ValueOf<typeof ScheduleStatus>) => {
  switch (status) {
    case ScheduleStatus.ADMIN_ONLY:
      return '-';
    case ScheduleStatus.PUBLIC:
      return '배포 완료';
    default:
      return '';
  }
};

export const parseScheduleResponseToFormValues = (
  response: ScheduleResponse,
): ScheduleFormValues => {
  const {
    name,
    generationNumber,
    startedAt,
    eventList,
    location: { roadAddress, detailAddress, latitude, longitude },
  } = response;

  const date: Dayjs = dayjs(startedAt, 'YYYY-MM-DD').startOf('day');

  const sessions: EventCreateRequest[] = eventList.map((event) => ({
    name: event.eventName,
    startedAt: formatDate(event.startedAt, 'HH:mm'),
    endedAt: formatDate(event.endedAt, 'HH:mm'),
    contentsCreateRequests: event.contentList.map((content) => ({
      title: content.title,
      desc: content.content,
      startedAt: formatDate(content.startedAt, 'HH:mm'),
    })),
  }));

  if (roadAddress) {
    return {
      name,
      generationNumber,
      date,
      sessions,
      locationType: LocationType.OFFLINE,
      locationInfo: {
        roadAddress,
        latitude: String(latitude),
        longitude: String(longitude),
        detailAddress: detailAddress ?? '',
      },
    };
  }

  return {
    name,
    generationNumber,
    date,
    sessions,
    locationType: LocationType.ONLINE,
  };
};

export const parseFormValuesToScheduleRequest = (
  formValues: ScheduleFormValues,
): ScheduleCreateRequest | ScheduleUpdateRequest => {
  const { generationNumber, date, sessions, name, locationType, locationInfo } = formValues;

  const formattedDate = date.format('YYYY-MM-DD');

  const eventsCreateRequests: EventCreateRequest[] = sessions.map((session) => ({
    ...session,
    contentsCreateRequests: session.contentsCreateRequests.map((content) => ({
      ...content,
      startedAt: toUtcFormat(`${formattedDate} ${content.startedAt}`),
    })),
    startedAt: toUtcFormat(`${formattedDate} ${session.startedAt}`),
    endedAt: toUtcFormat(`${formattedDate} ${session.endedAt}`),
  }));

  const startedAt = toUtcFormat(`${formattedDate} ${sessions[0]?.startedAt}`);
  const endedAt = toUtcFormat(`${formattedDate} ${sessions[sessions.length - 1]?.endedAt}`);

  const scheduleRequest: ScheduleCreateRequest | ScheduleUpdateRequest = {
    generationNumber,
    name,
    startedAt,
    endedAt,
    eventsCreateRequests,
  };

  if (locationType === LocationType.OFFLINE && locationInfo) {
    scheduleRequest.roadAddress = locationInfo.roadAddress;
    scheduleRequest.latitude = Number(locationInfo.latitude);
    scheduleRequest.longitude = Number(locationInfo.longitude);
    scheduleRequest.detailAddress = locationInfo.detailAddress;
  }

  return scheduleRequest;
};
