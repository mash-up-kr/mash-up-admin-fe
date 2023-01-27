import React, { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { DatePickerField, InputField, SelectField } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import * as Styled from './ScheduleTemplate.styled';
import { $generations } from '@/store';
import { SelectOption } from '@/components/common/Select/Select.component';
import { SessionTemplate } from '../SessionTemplate';
import Plus from '@/assets/svg/plus-20.svg';
import { EventCreateRequest } from '@/types';
import { ScheduleFormValues } from '@/utils';

const DEFAULT_SESSION: EventCreateRequest = {
  startedAt: '',
  name: '',
  endedAt: '',
  contentsCreateRequests: [],
};

const ScheduleTemplate = () => {
  const { register, control, formState, getValues } = useFormContext<ScheduleFormValues>();
  const generations = useRecoilValue($generations);

  const { fields, append, remove } = useFieldArray({
    name: 'sessions',
    control,
  });

  const generationOptions = useMemo<SelectOption[]>(() => {
    return generations.map(({ generationNumber }) => ({
      label: `${generationNumber}기`,
      value: generationNumber.toString(),
    }));
  }, [generations]);

  const defaultOption = generationOptions.find(
    (option) => option.value === getValues('generationNumber')?.toString(),
  );

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
          defaultValue={defaultOption}
          required
          isFullWidth
          {...register('generationNumber', { required: true })}
        />
        <DatePickerField
          label="스케줄 일시"
          $size="md"
          placeholder="내용을 입력해주세요"
          required
          defaultDate={getValues('date')}
          {...register('date', { required: true })}
        />
      </Styled.ScheduleContent>
      <Styled.SessionContent>
        <Styled.Title>세션 정보</Styled.Title>
        {fields.map((field, index) => (
          <SessionTemplate
            key={field.id}
            index={index}
            {...field}
            onRemove={remove}
            errors={formState.errors.sessions?.[index]}
          />
        ))}
        <Styled.AddButton type="button" onClick={() => append(DEFAULT_SESSION)}>
          <Plus />
          세션 추가
        </Styled.AddButton>
      </Styled.SessionContent>
    </>
  );
};

export default ScheduleTemplate;
