import { FieldValues, UseFormRegister } from 'react-hook-form';
import React, { forwardRef, useState, useRef, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker, Input } from '@/components';

import { InputProps } from '@/components/common/Input/Input.component';
import { useOnClickOutSide, useToggleState } from '@/hooks';
import { formatDate } from '@/utils';

type DatePickerFieldProps = InputProps;

const DatePickerField = (
  { className, onClick, ...restProps }: DatePickerFieldProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [isDatePickerOpened, toggleDatePickerOpened] = useToggleState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const containerRef = useRef(null);

  const formattedDate = useMemo(() => {
    if (!selectedDate) {
      return '';
    }

    return formatDate(selectedDate.toDate(), 'YYYY.MM.DD');
  }, [selectedDate]);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(event);

    if (!isDatePickerOpened) {
      toggleDatePickerOpened();
    }
  };

  const handleSelectDate = (clickedDate: Dayjs) => {
    setSelectedDate(clickedDate);
    toggleDatePickerOpened();
  };

  useOnClickOutSide(containerRef, () => {
    if (isDatePickerOpened) toggleDatePickerOpened();
  });

  return (
    <div ref={containerRef}>
      <Input ref={ref} value={formattedDate} readOnly onClick={handleClick} {...restProps} />
      {isDatePickerOpened && (
        <DatePicker
          className={className}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
        />
      )}
    </div>
  );
};

export default forwardRef<
  HTMLInputElement,
  DatePickerFieldProps & ReturnType<UseFormRegister<FieldValues>>
>(DatePickerField);
