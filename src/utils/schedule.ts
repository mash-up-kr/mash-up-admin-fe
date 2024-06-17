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

export const ScheduleType = {
  PLATFORM: 'PLATFORM',
  ALL: 'ALL',
} as const;

export const SchedulePlatformType = {
  ALL: 'ALL',
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  WEB: 'WEB',
  SPRING: 'SPRING',
  NODE: 'NODE',
  DESIGN: 'DESIGN',
} as const;

export interface ScheduleFormValues {
  name: string;
  generationNumber: number;
  scheduleType: ValueOf<typeof ScheduleType>;
  schedulePlatformType?: ValueOf<typeof SchedulePlatformType>;
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

export const getScheduleType = (type: ValueOf<typeof SchedulePlatformType>) => {
  switch (type) {
    case SchedulePlatformType.ALL:
      return '전체';
    case SchedulePlatformType.ANDROID:
      return 'Android';
    case SchedulePlatformType.IOS:
      return 'iOS';
    case SchedulePlatformType.WEB:
      return 'Web';
    case SchedulePlatformType.SPRING:
      return 'Spring';
    case SchedulePlatformType.NODE:
      return 'Node';
    case SchedulePlatformType.DESIGN:
      return 'Design';
    default:
      return '';
  }
};

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
    scheduleType: responseScheduleType,
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

  const isScheduleAll = responseScheduleType === 'ALL';
  const scheduleType = isScheduleAll ? ScheduleType.ALL : ScheduleType.PLATFORM;
  const schedulePlatformType = isScheduleAll ? undefined : responseScheduleType;

  if (roadAddress) {
    return {
      name,
      generationNumber,
      scheduleType,
      schedulePlatformType,
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
    scheduleType,
    schedulePlatformType,
    date,
    sessions,
    locationType: LocationType.ONLINE,
  };
};

export const parseFormValuesToScheduleRequest = (
  formValues: ScheduleFormValues,
): ScheduleCreateRequest | ScheduleUpdateRequest => {
  const {
    generationNumber,
    scheduleType: formScheduleType,
    schedulePlatformType,
    date,
    sessions,
    name,
    locationType,
    locationInfo,
  } = formValues;

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
    scheduleType: formScheduleType === ScheduleType.ALL ? ScheduleType.ALL : schedulePlatformType!,
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
