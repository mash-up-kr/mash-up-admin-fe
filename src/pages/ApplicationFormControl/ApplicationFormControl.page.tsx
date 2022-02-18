import React from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import {
  BackButton,
  ApplicationFormItem,
  CreateApplicationFormAside,
  InputField,
} from '@/components';
import * as Styled from './ApplicationFormControl.styled';
import { InputSize } from '@/components/common/Input/Input.component';

import Plus from '@/assets/svg/plus-20.svg';
import { Question, QuestionType } from '@/types/dto/ApplicationForm';

interface FormValues {
  title: string;
  questions: Question[];
}

const DEFAULT_QUESTION: Question = {
  content: '',
  description: '',
  maxContentLength: 0,
  questionType: QuestionType.multiLineText,
  required: false,
};

const DEFAULT_QUESTIONS: Question[] = new Array(4).fill(DEFAULT_QUESTION);

const ApplicationFormControl = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      questions: DEFAULT_QUESTIONS,
    },
  });

  const { register, handleSubmit, control } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
  });

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const obSubmit = (data: FormValues) => {
    // TODO:(@mango906): api 연동해주기
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <Styled.ApplicationFormControlPage>
        <section>
          <BackButton label="목록 돌아가기" />
          <Styled.Headline>지원설문지 작성</Styled.Headline>
        </section>
        <form onSubmit={handleSubmit(obSubmit)}>
          <article>
            <Styled.Content>
              <InputField
                $size={InputSize.md}
                label="지원설문지 문서명"
                placeholder="내용을 입력해주세요"
                {...register('title', { required: true })}
              />
            </Styled.Content>
            <Styled.QuestionContent>
              {fields.map((field, index) => (
                <ApplicationFormItem
                  {...field}
                  key={field.id}
                  index={index}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
              <Styled.Divider />
              <Styled.AddButton onClick={() => append(DEFAULT_QUESTION)}>
                <Plus />
                <span>질문 추가</span>
              </Styled.AddButton>
            </Styled.QuestionContent>
          </article>
          <CreateApplicationFormAside />
        </form>
      </Styled.ApplicationFormControlPage>
    </FormProvider>
  );
};

export default ApplicationFormControl;
