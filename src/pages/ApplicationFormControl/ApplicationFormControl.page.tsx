import React from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  ApplicationFormItem,
  ApplicationFormAside,
  InputField,
  ApplicationFormSection,
} from '@/components';
import * as Styled from './ApplicationFormControl.styled';
import { InputSize } from '@/components/common/Input/Input.component';

import Plus from '@/assets/svg/plus-20.svg';
import { Question, QuestionKind, ApplicationFormCreateRequest } from '@/types/dto/applicationForm';
import * as api from '@/api';
import { $profile } from '@/store';

interface FormValues {
  name: string;
  questions: Question[];
}

const DEFAULT_QUESTION: Question = {
  content: '',
  description: '',
  maxContentLength: 0,
  questionType: QuestionKind.multiLineText,
  required: false,
};

const current = new Date().toISOString();

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

  const handleSubmitForm = useRecoilCallback(() => async (data: FormValues) => {
    // TODO:(@mango906): teamId 선택하는 정책 논의 후 teamId 동적으로 결정하기
    const requestDto: ApplicationFormCreateRequest = {
      ...data,
      teamId: 9,
    };

    // TODO:(@mango906): api 요청 완료후 로직 만들어주기
    api.createApplicationForm(requestDto);
  });

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const position = useRecoilValue($profile)[2];

  return (
    <FormProvider {...methods}>
      <Styled.ApplicationFormControlPage>
        <ApplicationFormSection headline="지원서 설문지 작성" />
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <article>
            <Styled.Content>
              <InputField
                $size={InputSize.md}
                label="지원설문지 문서명"
                placeholder="내용을 입력해주세요"
                {...register('name', { required: true })}
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
          <ApplicationFormAside
            createdAt={current}
            platform="Design"
            createdBy={position}
            leftActionButton={{ text: '취소' }}
            rightActionButton={{ text: '저장' }}
          />
        </form>
      </Styled.ApplicationFormControlPage>
    </FormProvider>
  );
};

export default ApplicationFormControl;
