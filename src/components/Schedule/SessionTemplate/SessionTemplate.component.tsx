import React from 'react';
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form';
import { InputField } from '@/components';
import * as Styled from './SessionTemplate.styled';
import Plus from '@/assets/svg/plus-20.svg';
import Minus from '@/assets/svg/minus-20.svg';
import { ContentTemplate } from '../ContentTemplate';
import { ContentsCreateRequest, EventCreateRequest } from '@/types';
import Time from '@/assets/svg/time-16.svg';
import { TIME_REGEX } from '@/utils';

interface SessionTemplateProps {
  index: number;
  onRemove: (index: number) => void;
  errors?: FieldErrors<EventCreateRequest>;
}

const DEFAULT_CONTENT: Partial<ContentsCreateRequest> = {};

const SessionTemplate = ({ index, onRemove, errors }: SessionTemplateProps) => {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `sessions.${index}.contentsCreateRequests`,
    control,
  });

  const handleRemoveSession = () => {
    onRemove(index);
  };

  return (
    <Styled.SessionTemplateWrapper>
      <InputField
        $size="md"
        label="세션명"
        placeholder="세션명을 입력해주세요"
        required
        {...register(`sessions.${index}.name`, { required: true })}
      />
      <Styled.SessionTimeInputLabel>
        세션 진행 시간
        <Styled.RequiredDot />
      </Styled.SessionTimeInputLabel>
      <Styled.SessionTimeInputWrapper>
        <Styled.SessionTimeInput
          $size="md"
          endIcon={<Time />}
          placeholder="13:00"
          errorMessage={errors?.startedAt?.message}
          {...register(`sessions.${index}.startedAt`, {
            required: true,
            pattern: {
              value: TIME_REGEX,
              message: '시간 형식이 올바르지 않습니다,',
            },
          })}
        />
        <Styled.SessionTimeInput
          $size="md"
          endIcon={<Time />}
          placeholder="13:45"
          errorMessage={errors?.endedAt?.message}
          {...register(`sessions.${index}.endedAt`, {
            required: true,
            pattern: {
              value: TIME_REGEX,
              message: '시간 형식이 올바르지 않습니다,',
            },
          })}
        />
      </Styled.SessionTimeInputWrapper>
      <Styled.ContentTemplateWrapper>
        {fields.map((field, fieldIndex) => (
          <ContentTemplate
            name={`sessions.${index}.contentsCreateRequests`}
            key={field.id}
            index={fieldIndex}
            onRemove={remove}
            errors={errors?.contentsCreateRequests?.[index]}
          />
        ))}
        <Styled.AddButton onClick={() => append(DEFAULT_CONTENT)}>
          <Plus />
          콘텐츠 추가
        </Styled.AddButton>
      </Styled.ContentTemplateWrapper>

      <Styled.DeleteButton onClick={handleRemoveSession}>
        <Minus />
        세션 삭제
      </Styled.DeleteButton>
    </Styled.SessionTemplateWrapper>
  );
};

export default SessionTemplate;
