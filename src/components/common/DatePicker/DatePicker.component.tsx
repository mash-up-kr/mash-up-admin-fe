import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ArrowLeft from '@/assets/svg/chevron-left-24.svg';
import ArrowRight from '@/assets/svg/chevron-right-24.svg';

import * as Styled from './DatePicker.styled';
import { rangeArray } from '@/utils';

const handleGenerateDateRows = (date: Dayjs) => {
  const { accRows: rows } = rangeArray(date.daysInMonth()).reduce<{
    accRows: Dayjs[][];
    accRowIndex: number;
  }>(
    ({ accRows, accRowIndex }, _, index) => {
      const currentIndexDate = dayjs(new Date(date.year(), date.month(), index + 1));

      accRows[accRowIndex].push(currentIndexDate);

      if (currentIndexDate.day() === 6 && index !== date.daysInMonth() - 1) {
        return { accRows: [...accRows, []], accRowIndex: accRowIndex + 1 };
      }

      return { accRows, accRowIndex };
    },
    { accRows: [[]], accRowIndex: 0 },
  );

  return rows.map((each, index) => {
    if (index === 0 && each.length !== 7) {
      return [
        ...rangeArray(7 - each.length).map((_, i) => each[0].clone().startOf('week').add(i, 'day')),
        ...each,
      ];
    }

    if (index === rows.length - 1 && each.length !== 7) {
      return [
        ...each,
        ...rangeArray(7 - each.length).map((_, i) =>
          each[each.length - 1].clone().add(i + 1, 'day'),
        ),
      ];
    }

    return each;
  });
};

interface DayCellProps extends React.TdHTMLAttributes<HTMLElement> {
  date: Dayjs;
  current: Dayjs;
  selectedDate: Dayjs | null;
  disablePast: boolean;
}

const CALENDAR_COLUMN = ['일', '월', '화', '수', '목', '금', '토'];

const DayCell = ({
  date,
  current,
  selectedDate,
  disablePast = false,
  ...resetProps
}: DayCellProps) => {
  const today = dayjs();
  const isCurrentMonth = date.month() === current.month();
  const isDisabled =
    (disablePast && date.isBefore(today) && !date.isSame(today, 'day')) || !isCurrentMonth;

  const props = {
    ...resetProps,
    disabled: isDisabled,
    today: date.isSame(today, 'day'),
    selected:
      date.isSame(selectedDate, 'year') &&
      date.isSame(selectedDate, 'month') &&
      date.isSame(selectedDate, 'date'),
  };

  return <Styled.DatePickerTd {...props}>{date.format('D')}</Styled.DatePickerTd>;
};

export interface DatePickerProps {
  handleSelectDate: (clickedDate: Dayjs) => void;
  selectedDate: Dayjs;
}

const DatePicker = ({ handleSelectDate, selectedDate }: DatePickerProps) => {
  const [date, setDate] = useState<Dayjs>(selectedDate);

  const rows = handleGenerateDateRows(date);

  const handleChangeMonth = (by: 'next' | 'prev') => {
    if (by === 'next') {
      return setDate(date.clone().add(1, 'month'));
    }

    setDate(date.clone().subtract(1, 'month'));
  };

  return (
    <Styled.DatePickerWrapper>
      <Styled.DatePickerHeader>
        <ArrowLeft onClick={() => handleChangeMonth('prev')} />
        <div>{date.format('YYYY.M')}</div>
        <ArrowRight onClick={() => handleChangeMonth('next')} />
      </Styled.DatePickerHeader>
      <Styled.DatePickerTable>
        <thead>
          <tr>
            {CALENDAR_COLUMN.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`tr-${row[i].date()}`}>
              {row.map((d) => (
                <DayCell
                  key={`td-${d.date()}`}
                  date={d}
                  current={date}
                  selectedDate={selectedDate}
                  disablePast
                  onClick={() => handleSelectDate(d.clone())}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </Styled.DatePickerTable>
    </Styled.DatePickerWrapper>
  );
};

export default DatePicker;
