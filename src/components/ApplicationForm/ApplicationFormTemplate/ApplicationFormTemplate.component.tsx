import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Question, QuestionKind } from '@/types';
import * as Styled from './ApplicationFormTemplate.style';
import { ApplicationFormItem, InputField } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import Plus from '@/assets/svg/plus-20.svg';

interface FormValues {
  name: string;
  questions: Question[];
  teamId: string;
}

const DEFAULT_QUESTION: Partial<Question> = {
  content: '',
  description: '',
  maxContentLength: null,
  questionType: QuestionKind.multiLineText,
  required: false,
};

const ApplicationFormTemplate = () => {
  const { register, control } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
  });

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Styled.Content>
        <InputField
          $size={InputSize.md}
          label="지원설문지 문서명"
          placeholder="내용을 입력해주세요"
          required
          {...register('name', { required: true })}
        />
      </Styled.Content>
      <Styled.QuestionContent>
        {fields.map((field, index) => (
          <ApplicationFormItem key={field.id} index={index} handleRemoveItem={handleRemoveItem} />
        ))}
        <Styled.Divider />
        <Styled.AddButton type="button" onClick={() => append(DEFAULT_QUESTION)}>
          <Plus />
          <span>질문 추가</span>
        </Styled.AddButton>
      </Styled.QuestionContent>
    </>
  );
};

export default ApplicationFormTemplate;
