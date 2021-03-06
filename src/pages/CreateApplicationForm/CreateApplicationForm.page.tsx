import React, { useEffect, useMemo, useState } from 'react';
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
  content: '',
  description: '',
  maxContentLength: null,
  questionType: QuestionKind.multiLineText,
  required: false,
};

const current = new Date().toISOString();

const DEFAULT_QUESTIONS: Question[] = new Array(4).fill(DEFAULT_QUESTION);

const CreateApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        message: '?????? ???????????? ????????? ?????????????????????.',
      });

      return;
    }

    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '?????????????????????????',
        paragraph: '????????? ????????? ???????????? ???????????? ??? ????????????.',
        confirmButtonLabel: '??????',
        handleClickConfirmButton: () => {
          request({
            requestFunc: () => {
              setIsLoading(true);
              return api.createApplicationForm(data);
            },
            errorHandler: handleAddToast,
            onSuccess: (response) => {
              set($modalByStorage(ModalKey.alertModalDialog), {
                key: ModalKey.alertModalDialog,
                isOpen: false,
              });

              const { applicationFormId } = response.data;

              handleAddToast({
                type: ToastType.success,
                message: '??????????????? ????????? ???????????? ??????????????????.',
              });

              navigate(getApplicationFormDetailPage(applicationFormId));
            },
            onCompleted: () => {
              setIsLoading(false);
              set($modalByStorage(ModalKey.alertModalDialog), {
                key: ModalKey.alertModalDialog,
                isOpen: false,
              });
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
        message: '???????????? ??????????????????.',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.errors.teamId]);

  return (
    <FormProvider {...methods}>
      <Styled.ApplicationFormControlPage>
        <ApplicationFormSection headline="????????? ????????? ??????" />
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <article>
            <ApplicationFormTemplate />
          </article>
          <ApplicationFormAside
            createdAt={current}
            platform={
              <Styled.TeamSelect
                placeholder="????????? ??????"
                size={SelectSize.sm}
                options={teamOptions}
                onChangeOption={(option) => setValue('teamId', Number(option.value))}
                {...register(`teamId`, { required: true })}
              />
            }
            createdBy={position}
            leftActionButton={{ text: '??????', onClick: () => navigate(-1), isLoading }}
            rightActionButton={{ text: '??????', type: 'submit' }}
          />
        </form>
      </Styled.ApplicationFormControlPage>
    </FormProvider>
  );
};

export default CreateApplicationForm;
