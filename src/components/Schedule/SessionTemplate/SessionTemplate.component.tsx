import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField } from '@/components';
import * as Styled from './SessionTemplate.styled';
import Time from '@/assets/svg/time-16.svg';

import Minus from '@/assets/svg/minus-20.svg';

interface SessionTemplateProps {
  index: number;
  onRemove: (index: number) => void;
}

const SessionTemplate = ({ index, onRemove }: SessionTemplateProps) => {
  const { register } = useFormContext();

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
        {...register(`sessions.${index}.title`)}
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
          {...register(`sessions.${index}.startedAt`)}
        />
        <Styled.SessionTimeInput
          endIcon={<Time />}
          $size="md"
          placeholder="13:45"
          {...register(`sessions.${index}.endedAt`)}
        />
      </Styled.SessionTimeInputWrapper>
      <Styled.DeleteButton onClick={handleRemoveSession}>
        <Minus />
        세션 삭제
      </Styled.DeleteButton>
    </Styled.SessionTemplateWrapper>
  );
};

export default SessionTemplate;
