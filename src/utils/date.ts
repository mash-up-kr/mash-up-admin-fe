import dayjs from 'dayjs';
import { ValueOf } from '@/types';
import 'dayjs/locale/ko';

dayjs.locale('ko');

type DateFormat =
  | 'YYYY년 M월 D일 A h시 m분'
  | 'YYYY년 M월 D일(ddd)'
  | 'a hh시 mm분'
  | 'YYYY년 M월 D일(ddd) a hh시 mm분'
  | 'YYYY.MM.DD'
  | 'YYYY-MM-DD'
  | 'YYYY년 M월 D일 hh시 mm분';

export const formatDate = (date: string | Date, format: DateFormat) => {
  return dayjs(date).format(format);
};

export const toUtcWithoutChangingTime = (date: string | Date) => {
  return dayjs(date).utc(true).format().replace('Z', '');
};

const [
  RECRUITMENT_START_KST_DATE, // 서류 접수 시작
  RECRUITMENT_END_KST_DATE, // 서류 접수 종료
  SCREENING_RESULT_ANNOUNCED_KST_DATE, // 서류 결과 발표
  INTERVIEW_RESULT_ANNOUNCED_KST_DATE, // 최종 합격 발표
  AFTER_FIRST_SEMINAR_JOIN_KST_DATE, // 첫번째 세미나 끝나는 시각
] = [
  dayjs('2022-03-16T00:00:00+09:00'),
  dayjs('2022-03-29T23:59:59+09:00'),
  dayjs('2022-04-03T10:00:00+09:00'),
  dayjs('2022-04-12T10:00:00+09:00'),
  dayjs('2022-04-16T17:00:00+09:00'),
];

export const RecruitingProgressStatus = {
  PREVIOUS: 'PREVIOUS',
  IN_RECRUITING: 'IN_RECRUITING',
  END_RECRUITING: 'END_RECRUITING',
  AFTER_SCREENING_ANNOUNCED: 'AFTER_SCREENING_ANNOUNCED', // 지원 현황 서류 검토 -> 서류 결과 발표
  AFTER_INTERVIEWING_ANNOUNCED: 'AFTER_INTERVIEWING_ANNOUNCED', // 지원 현황 서류 결과 발표 -> 최종 합격 발표
  AFTER_FIRST_SEMINAR: 'AFTER_FIRST_SEMINAR', // 지원 현황 결과 발표 숨김
  INVALID: 'INVALID',
} as const;

export type RecruitingProgressStatusValueType = ValueOf<typeof RecruitingProgressStatus>;

export const getRecruitingProgressStatusFromRecruitingPeriod = (
  date: Date,
): RecruitingProgressStatusValueType => {
  const currentDate = dayjs(date);
  if (currentDate < RECRUITMENT_START_KST_DATE) {
    return RecruitingProgressStatus.PREVIOUS;
  }
  if (RECRUITMENT_START_KST_DATE <= currentDate && currentDate <= RECRUITMENT_END_KST_DATE) {
    return RecruitingProgressStatus.IN_RECRUITING;
  }
  if (RECRUITMENT_END_KST_DATE < currentDate && currentDate < SCREENING_RESULT_ANNOUNCED_KST_DATE) {
    return RecruitingProgressStatus.END_RECRUITING;
  }
  if (
    SCREENING_RESULT_ANNOUNCED_KST_DATE <= currentDate &&
    currentDate < INTERVIEW_RESULT_ANNOUNCED_KST_DATE
  ) {
    return RecruitingProgressStatus.AFTER_SCREENING_ANNOUNCED;
  }
  if (
    INTERVIEW_RESULT_ANNOUNCED_KST_DATE <= currentDate &&
    currentDate < AFTER_FIRST_SEMINAR_JOIN_KST_DATE
  ) {
    return RecruitingProgressStatus.AFTER_INTERVIEWING_ANNOUNCED;
  }
  if (AFTER_FIRST_SEMINAR_JOIN_KST_DATE <= currentDate) {
    return RecruitingProgressStatus.AFTER_FIRST_SEMINAR;
  }
  return RecruitingProgressStatus.INVALID;
};
