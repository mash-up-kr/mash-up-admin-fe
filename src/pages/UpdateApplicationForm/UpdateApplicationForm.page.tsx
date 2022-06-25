import React, { useState } from 'react';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import * as Styled from './UpdateApplicationForm.styled';
import { $applicationFormDetail, $modalByStorage, ModalKey } from '@/store';
import { ParamId, Question } from '@/types';
import { ApplicationFormAside, ApplicationFormSection } from '@/components';
import ApplicationFormTemplate from '@/components/ApplicationForm/ApplicationFormTemplate/ApplicationFormTemplate.component';
import * as api from '@/api';
import { request } from '@/utils';
import { useToast, useUnmount } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';
import { getApplicationFormDetailPage } from '@/constants';

interface FormValues {
  name: string;
  questions: Question[];
}

const UpdateApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<ParamId>();

  const [{ questions, name, createdAt, team, createdBy, updatedAt, updatedBy }] = useRecoilState(
    $applicationFormDetail({ id: id ?? '' }),
  );

  const resetApplicationFormDetail = useResetRecoilState($applicationFormDetail({ id: id ?? '' }));

  const methods = useForm<FormValues>({
    defaultValues: {
      questions,
      name,
    },
    shouldUnregister: true,
  });

  const navigate = useNavigate();

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({ control });

  const { handleAddToast } = useToast();

  const handleSubmitForm = useRecoilCallback(({ set }) => async (data: FormValues) => {
    if (!id) {
      return;
    }

    if (data.questions.length === 0) {
      handleAddToast({
        type: ToastType.error,
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
            requestFunc: () => {
              setIsLoading(true);
              return api.updateApplicationForm(id, data);
            },
            errorHandler: handleAddToast,
            onSuccess: () => {
              handleAddToast({
                type: ToastType.success,
                message: '성공적으로 지원서 설문지를 수정했습니다.',
              });

              navigate(getApplicationFormDetailPage(id));
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

  useUnmount(() => {
    resetApplicationFormDetail();
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
            leftActionButton={{ text: '취소', type: 'button', onClick: () => navigate(-1) }}
            rightActionButton={{ text: '저장', type: 'submit', disabled: !isDirty, isLoading }}
          />
        </form>
      </Styled.UpdateApplicationFormPage>
    </FormProvider>
  );
};

export default UpdateApplicationForm;
