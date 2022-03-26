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
