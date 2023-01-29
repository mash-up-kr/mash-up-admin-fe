import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { parsePlaceholderWhenInvalidDate } from '.';

dayjs.locale('ko');

type DateFormat =
  | 'YYYY년 M월 D일 A h시 m분'
  | 'YYYY년 M월 D일(ddd)'
  | 'a hh시 mm분'
  | 'YYYY년 M월 D일(ddd) a hh시 mm분'
  | 'YYYY.MM.DD'
  | 'YYYY-MM-DD'
  | 'YYYY년 M월 D일 hh시 mm분'
  | 'hh:mm';

export const TIME_REGEX = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g;

export const formatDate = (date: string | Date, format: DateFormat) => {
  return parsePlaceholderWhenInvalidDate(dayjs(date).format(format));
};

export const toUtcWithoutChangingTime = (date: string | Date) => {
  return dayjs(date).utc(true).format().replace('Z', '');
};
