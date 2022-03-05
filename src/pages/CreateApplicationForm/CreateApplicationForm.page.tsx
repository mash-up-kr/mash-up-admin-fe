import React, { useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ApplicationFormAside, ApplicationFormSection } from '@/components';
import * as Styled from './CreateApplicationForm.styled';

import { Question, QuestionKind } from '@/types/dto/applicationForm';
import * as api from '@/api';
import { $modalByStorage, $profile, $teams, ModalKey } from '@/store';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import ApplicationFormTemplate from '@/components/ApplicationForm/ApplicationFormTemplate/ApplicationFormTemplate.component';
import { useToast } from '@/hooks';

import { request } from '@/utils';
import { ToastType } from '@/components/common/Toast/Toast.component';
import { getApplicationFormDetailPage } from '@/constants';

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

  const { register, handleSubmit, setValue, formState } = methods;

  const navigate = useNavigate();

  const teams = useRecoilValue($teams);

  const teamOptions = useMemo<SelectOption[]>(
    () =>
      teams.map((team) => ({
        value: team.teamId.toString(),
        label: team.name,
      })),
    [teams],
  );

  const { handleAddToast } = useToast();

  const handleSubmitForm = useRecoilCallback(({ set }) => async (data: FormValues) => {
    if (data.questions.length === 0) {
      handleAddToast({
        type: 'error',
        message: '최소 한가지의 질문을 작성해야합니다.',
      });

      return;
    }

    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '저장하시겠습니까?',
        paragraph: '지원서 설문지 내역에서 확인하실 수 있습니다.',
        confirmButtonLabel: '저장',
        handleClickConfirmButton: () => {
          request({
            requestFunc: () => api.createApplicationForm(data),
            errorHandler: handleAddToast,
            onSuccess: (response) => {
              set($modalByStorage(ModalKey.alertModalDialog), {
                key: ModalKey.alertModalDialog,
                isOpen: false,
              });

              const { applicationFormId } = response.data;

              handleAddToast({
                type: ToastType.success,
                message: '성공적으로 지원서 설문지를 작성했습니다.',
              });

              navigate(getApplicationFormDetailPage(applicationFormId));
            },
          });
        },
      },
    });
  });

  const position = useRecoilValue($profile)[2];

  useEffect(() => {
    if (formState.errors.teamId?.type === 'required') {
      handleAddToast({
        type: ToastType.error,
        message: '플랫폼을 선택해주세요.',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.errors.teamId]);

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
            leftActionButton={{ text: '취소', onClick: () => navigate(-1) }}
            rightActionButton={{ text: '저장', type: 'submit' }}
          />
        </form>
      </Styled.ApplicationFormControlPage>
    </FormProvider>
  );
};

export default CreateApplicationForm;
