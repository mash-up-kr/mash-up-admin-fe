import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const convertToFormatDate = (rawDate: string, isTime = true) => {
  return dayjs(rawDate)
    .locale('ko')
    .format(`YYYY년 M월 D일(ddd)${isTime ? ' 오후 h시 M분' : ''}`);
};
