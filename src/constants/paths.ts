import { KeyOf, ValueOf } from '@/types';

export const PATH = {
  LOGIN: '/login',
  APPLICATION: '/application',
  APPLICATION_DETAIL: '/application/:id',
  EMAIL: '/email',
  APPLICATION_FORM: '/application-form',
  APPLICATION_FORM_DETAIL: '/application-form/:id',
  APPLICATION_FORM_CREATE: '/application-form/create',
  APPLICATION_FORM_UPDATE: '/application-form/update/:id',
  ACTIVITY_SCORE: '/activity-score',
  ACTIVITY_SCORE_DETAIL: '/activity-score/:generationNumber/:memberId',
  SCHEDULE: '/schedule',
  SCHEDULE_DETAIL: '/schedule/:scheduleId',
  SCHEDULE_CREATE: '/schedule/create',
  SCHEDULE_UPDATE: '/schedule/update/:scheduleId',
  UPDATE_PLATFORM_RECRUIT: '/recruit',
  ADMIN_MEMBERS: '/admin-members',
  SIGNUP_CODE: '/signup-code',
  RECRUIT: '/recruit',
  FAQ: '/faq',
  MY_PAGE: '/my-page',
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
} as const;

export type PathKeyType = KeyOf<typeof PATH>;
export type PathValueType = ValueOf<typeof PATH>;

export const getApplicationFormDetailPage = (applicationFormId: string | number) =>
  `/application-form/${applicationFormId}`;

export const getScheduleDetailPage = (scheduleId: string | number) => `/schedule/${scheduleId}`;

export const getScheduleUpdatePage = (scheduleId: string | number) =>
  `/schedule/update/${scheduleId}`;
