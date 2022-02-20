import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

type DateFormat = 'YYYY년 M월 D일 A h시 m분';

export const formatDate = (date: string | Date, format: DateFormat) => {
  return dayjs(date).format(format);
};
