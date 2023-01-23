import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { DatePickerField, InputField, SelectField } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import * as Styled from './ScheduleTemplate.styled';
import { $generations } from '@/store';
import { SelectOption } from '@/components/common/Select/Select.component';

interface FormValues {
  name: string;
  generationNumber: number;
  date: string;
}

const ScheduleTemplate = () => {
  const { register } = useFormContext<FormValues>();
  const generations = useRecoilValue($generations);

  const generationOptions = useMemo<SelectOption[]>(() => {
    return generations.map(({ generationNumber }) => ({
      label: `${generationNumber}기`,
      value: generationNumber.toString(),
    }));
  }, [generations]);

  return (
    <>
      <Styled.ScheduleContent>
        <Styled.Title>스케줄 정보</Styled.Title>
        <InputField
          $size={InputSize.md}
          label="스케줄 제목"
          placeholder="내용을 입력해주세요"
          required
          {...register('name', { required: true })}
        />
        <SelectField
          label="기수"
          size="md"
          options={generationOptions}
          required
          isFullWidth
          {...register('generationNumber', { required: true })}
        />
        <DatePickerField
          label="스케줄 일시"
          $size="md"
          placeholder="내용을 입력해주세요"
          required
          {...register('date', { required: true })}
        />
      </Styled.ScheduleContent>
      <Styled.SessionContent>
        <Styled.Title>세션 정보</Styled.Title>
      </Styled.SessionContent>
    </>
  );
};

export default ScheduleTemplate;
