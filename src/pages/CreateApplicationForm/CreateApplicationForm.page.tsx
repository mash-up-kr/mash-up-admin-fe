import React, { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { ApplicationFormAside, ApplicationFormSection } from '@/components';
import * as Styled from './CreateApplicationForm.styled';

import { Question, QuestionKind } from '@/types/dto/applicationForm';
import * as api from '@/api';
import { $profile, $teams } from '@/store';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import ApplicationFormTemplate from '@/components/ApplicationForm/ApplicationFormTemplate/ApplicationFormTemplate.component';

interface FormValues {
  name: string;
  questions: Question[];
  teamId: number;
}

const DEFAULT_QUESTION: Partial<Question> = {
  questionType: QuestionKind.multiLineText,
};

const current = new Date().toISOString();

const DEFAULT_QUESTIONS: Question[] = new Array(4).fill(DEFAULT_QUESTION);

const CreateApplicationForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      questions: DEFAULT_QUESTIONS,
    },
  });

  const { register, handleSubmit, setValue } = methods;

  const teams = useRecoilValue($teams);

  const teamOptions = useMemo<SelectOption[]>(
    () =>
      teams.map((team) => ({
        value: team.teamId.toString(),
        label: team.name,
      })),
    [teams],
  );

  const handleSubmitForm = useRecoilCallback(() => async (data: FormValues) => {
    // TODO:(@mango906): 입력값 제대로 입력안했을 떄 어떻게 알려줄지 정하기
    if (data.questions.length === 0) {
      return;
    }

    // TODO:(@mango906): api 요청 완료후 로직 만들어주기
    api.createApplicationForm(data);
  });

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const position = useRecoilValue($profile)[2];

  return (
    <FormProvider {...methods}>
      <Styled.ApplicationFormControlPage>
        <ApplicationFormSection headline="지원서 설문지 작성" />
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <article>
            <ApplicationFormTemplate />
          </article>
          <ApplicationFormAside
            createdAt={current}
            platform={
              <Styled.TeamSelect
                placeholder="플랫폼 선택"
                size={SelectSize.sm}
                options={teamOptions}
                onChangeOption={(option) => setValue('teamId', Number(option.value))}
                {...register(`teamId`, { required: true })}
              />
            }
            createdBy={position}
            leftActionButton={{ text: '취소' }}
            rightActionButton={{ text: '저장' }}
          />
        </form>
      </Styled.ApplicationFormControlPage>
    </FormProvider>
  );
};

export default CreateApplicationForm;
