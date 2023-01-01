import React, { useState } from 'react';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { ApplicationFormSection, ApplicationFormAside } from '@/components';
import * as Styled from './ApplicationFormDetail.styled';

import { ParamId, Question, QuestionKind } from '@/types';

import { $applicationFormDetail } from '@/store/applicationForm';
import { InputSize } from '@/components/common/Input/Input.component';
import * as api from '@/api';
import { useRefreshSelectorFamilyByKey, useToast, useUnmount } from '@/hooks';
import { request } from '@/utils';
import { PATH } from '@/constants';
import { $modalByStorage, ModalKey } from '@/store';
import { ToastType } from '@/components/common/Toast/Toast.component';

interface FormValues {
  questions: Question[];
}

const ApplicationFormDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<ParamId>();

  const navigate = useNavigate();
  const { handleAddToast } = useToast();
  const refreshSelectorFamilyByKey = useRefreshSelectorFamilyByKey();

  const [{ questions, name, team, createdAt, createdBy, updatedAt, updatedBy }] = useRecoilState(
    $applicationFormDetail({ id: id ?? '' }),
  );

  const resetApplicationFormDetail = useResetRecoilState($applicationFormDetail({ id: id ?? '' }));

  const methods = useForm<FormValues>({ defaultValues: { questions } });

  const handleRemoveQuestion = useRecoilCallback(({ set }) => async () => {
    if (!id) {
      return;
    }

    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '삭제하시겠습니까?',
        paragraph: '작성 또는 수정하신 데이터가 삭제됩니다.',
        confirmButtonLabel: '삭제',
        handleClickConfirmButton: () => {
          request({
            requestFunc: () => {
              setIsLoading(true);
              return api.deleteApplicationForm(id);
            },
            errorHandler: handleAddToast,
            onSuccess: () => {
              handleAddToast({
                type: ToastType.success,
                message: '성공적으로 지원서 설문지를 삭제했습니다.',
              });

              refreshSelectorFamilyByKey('applicationForms');
              navigate(PATH.APPLICATION_FORM);
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
      <Styled.ApplicationFormDetailPage>
        <ApplicationFormSection headline="지원서 설문지 상세" />
        <div>
          <article>
            <Styled.Content>
              <span>지원설문지 문서명</span>
              <span>{name}</span>
            </Styled.Content>
            <Styled.QuestionContent>
              {questions.map((question, index) => {
                const readableIndex = index + 1;

                const props = {
                  label: `${readableIndex}. ${question.content}`,
                  description: question.description,
                  disabled: true,
                  required: question.required,
                };

                return (
                  <li key={question.questionId}>
                    {question.questionType === QuestionKind.multiLineText ? (
                      <Styled.CustomTextarea {...props} placeholder="장문형 텍스트입니다." />
                    ) : (
                      <Styled.CustomInput
                        {...props}
                        $size={InputSize.md}
                        placeholder="단답형 텍스트입니다."
                      />
                    )}
                  </li>
                );
              })}
            </Styled.QuestionContent>
          </article>
          <ApplicationFormAside
            platform={team.name}
            createdAt={createdAt}
            createdBy={createdBy}
            updatedAt={updatedAt}
            updatedBy={updatedBy}
            leftActionButton={{
              text: '삭제',
              onClick: handleRemoveQuestion,
              isLoading,
            }}
            rightActionButton={{
              text: '수정',
              onClick: () => navigate(`/application-form/update/${id}`),
            }}
          />
        </div>
      </Styled.ApplicationFormDetailPage>
    </FormProvider>
  );
};

export default ApplicationFormDetail;
