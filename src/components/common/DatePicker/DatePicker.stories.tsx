import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker, { DatePickerProps } from './DatePicker.component';

export default {
  title: 'DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const handleSelectDate = (clickedDate: Dayjs) => {
    setSelectedDate(clickedDate);
  };

  return <DatePicker {...args} selectedDate={selectedDate} handleSelectDate={handleSelectDate} />;
};

export const datePicker = Template.bind({});
