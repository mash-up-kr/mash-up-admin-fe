import React from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import * as Styled from './UpdateApplicationForm.styled';
import { $applicationFormDetail } from '@/store';
import { ParamId, Question } from '@/types';
import { ApplicationFormAside, ApplicationFormSection } from '@/components';
import ApplicationFormTemplate from '@/components/ApplicationForm/ApplicationFormTemplate/ApplicationFormTemplate.component';
import * as api from '@/api';

interface FormValues {
  name: string;
  questions: Question[];
}

const UpdateApplicationForm = () => {
  const { id } = useParams<ParamId>();

  const [{ questions, name, createdAt, team, createdBy, updatedAt, updatedBy }] = useRecoilState(
    $applicationFormDetail({ id: id ?? '' }),
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      questions,
      name,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({ control });

  const handleSubmitForm = useRecoilCallback(() => async (data: FormValues) => {
    if (!id) {
      return;
    }

    // TODO:(@mango906): 입력값 제대로 입력안했을 떄 어떻게 알려줄지 정하기
    if (data.questions.length === 0) {
      return;
    }

    // TODO:(@mango906): api 요청 완료후 로직 만들어주기
    api.updateApplicationForm(id, data);
  });

  return (
    <FormProvider {...methods}>
      <Styled.UpdateApplicationFormPage>
        <ApplicationFormSection headline="지원서 설문지 상세" />
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <article>
            <ApplicationFormTemplate />
          </article>
          <ApplicationFormAside
            createdAt={createdAt}
            platform={team.name}
            createdBy={createdBy}
            updatedAt={updatedAt}
            updatedBy={updatedBy}
            leftActionButton={{ text: '취소', type: 'button' }}
            rightActionButton={{ text: '저장', type: 'submit', disabled: !isDirty }}
          />
        </form>
      </Styled.UpdateApplicationFormPage>
    </FormProvider>
  );
};

export default UpdateApplicationForm;
