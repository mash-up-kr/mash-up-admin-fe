import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

type DateFormat =
  | 'YYYY년 M월 D일 A h시 m분'
  | 'YYYY년 M월 D일(ddd)'
  | 'a hh시 mm분'
  | 'YYYY년 M월 D일(ddd) a hh시 mm분';

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
  dayjs('2022-04-02T10:00:00+09:00'),
  dayjs('2022-04-12T10:00:00+09:00'),
  dayjs('2022-04-16T17:00:00+09:00'),
];

export type RecruitingProgressStatus =
  | 'PREVIOUS'
  | 'IN-RECRUITING'
  | 'END-RECRUITING'
  | 'AFTER-SCREENING-ANNOUNCED' // 지원 현황 서류 검토 -> 서류 결과 발표
  | 'AFTER-INTERVIEWING-ANNOUNCED' // 지원 현황 서류 결과 발표 -> 최종 합격 발표
  | 'AFTER-FIRST-SEMINAR' // 지원 현황 결과 발표 숨김
  | 'INVALID';

export const getRecruitingProgressStatusFromRecruitingPeriod = (
  date: Date,
): RecruitingProgressStatus => {
  const currentDate = dayjs(date);
  if (currentDate < RECRUITMENT_START_KST_DATE) {
    return 'PREVIOUS';
  }
  if (RECRUITMENT_START_KST_DATE <= currentDate && currentDate <= RECRUITMENT_END_KST_DATE) {
    return 'IN-RECRUITING';
  }
  if (RECRUITMENT_END_KST_DATE < currentDate && currentDate < SCREENING_RESULT_ANNOUNCED_KST_DATE) {
    return 'END-RECRUITING';
  }
  if (
    SCREENING_RESULT_ANNOUNCED_KST_DATE <= currentDate &&
    currentDate < INTERVIEW_RESULT_ANNOUNCED_KST_DATE
  ) {
    return 'AFTER-SCREENING-ANNOUNCED';
  }
  if (
    INTERVIEW_RESULT_ANNOUNCED_KST_DATE <= currentDate &&
    currentDate < AFTER_FIRST_SEMINAR_JOIN_KST_DATE
  ) {
    return 'AFTER-INTERVIEWING-ANNOUNCED';
  }
  if (AFTER_FIRST_SEMINAR_JOIN_KST_DATE <= currentDate) {
    return 'AFTER-FIRST-SEMINAR';
  }
  return 'INVALID';
};
