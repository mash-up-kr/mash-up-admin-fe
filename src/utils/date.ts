import dayjs from 'dayjs';

type DateFormat = 'YYYY년MM월DD일 hh시mm분';

export const formatDate = (date: string | Date, format: DateFormat) => {
  return dayjs(date).format(format);
};
