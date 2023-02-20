import React from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { getReadableIndex, TIME_REGEX } from '@/utils';
import * as Styled from './ContentTemplate.styled';
import { InputField } from '@/components';
import Time from '@/assets/svg/time-16.svg';
import TrashCan from '@/assets/svg/trash-can-36.svg';
import { ContentsCreateRequest } from '@/types';

interface ContentTemplateProps {
  name: string;
  index: number;
  onRemove: (index: number) => void;
  errors?: FieldErrors<ContentsCreateRequest>;
}

const ContentTemplate = ({ name, index, onRemove, errors }: ContentTemplateProps) => {
  const { register } = useFormContext();

  const handleRemoveContent = () => onRemove(index);

  return (
    <Styled.ContentTemplateContainer>
      <Styled.ContentTemplateWrapper>
        <Styled.ContentTemplateTitleWrapper>
          <Styled.ContentTemplateIndex>{getReadableIndex(index)}&#46;</Styled.ContentTemplateIndex>
          <InputField
            $size="md"
            placeholder="콘텐츠 제목을 입력해주세요"
            {...register(`${name}.${index}.title`, { required: true })}
          />
        </Styled.ContentTemplateTitleWrapper>
        <InputField
          $size="sm"
          placeholder="설명을 입력해주세요(선택사항입니다.)"
          {...register(`${name}.${index}.desc`)}
        />
        <Styled.StartedAtInputField
          $size="md"
          placeholder="13:00"
          endIcon={<Time />}
          errorMessage={errors?.startedAt?.message}
          {...register(`${name}.${index}.startedAt`, {
            required: true,
            pattern: {
              value: TIME_REGEX,
              message: '시간 형식이 아닙니다.',
            },
          })}
        />
      </Styled.ContentTemplateWrapper>
      <Styled.RemoveIcon type="button" onClick={handleRemoveContent}>
        <TrashCan />
      </Styled.RemoveIcon>
    </Styled.ContentTemplateContainer>
  );
};

export default ContentTemplate;
