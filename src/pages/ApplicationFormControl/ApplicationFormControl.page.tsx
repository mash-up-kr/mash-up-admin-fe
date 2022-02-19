import React, { useMemo } from 'react';
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
import { Question, QuestionKind } from '@/types/dto/applicationForm';
import * as api from '@/api';
import { $profile, $teams } from '@/store';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';

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

const ApplicationFormControl = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      questions: DEFAULT_QUESTIONS,
    },
  });

  const { register, handleSubmit, control, setValue } = methods;

  const teams = useRecoilValue($teams);

  const teamOptions = useMemo<SelectOption[]>(
    () =>
      teams.map((team) => ({
        value: team.teamId.toString(),
        label: team.name,
      })),
    [teams],
  );

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
  });

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

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

export default ApplicationFormControl;
