import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const convertToFormatDate = (rawDate: string) => {
  return dayjs(rawDate).locale('ko').format(`YYYY년 M월 D일(ddd)`);
};

export const convertToFormatTime = (rawDate: string) => {
  return dayjs(rawDate).locale('ko').format('a hh시 mm분');
};
