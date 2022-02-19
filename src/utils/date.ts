import dayjs from 'dayjs';

type DateFormat = 'YYYY년MM월DD일 hh시mm분';

export const formatDate = (date: string | Date, format: DateFormat) => {
  console.log('date', date);

  return dayjs(date).format(format);
};
