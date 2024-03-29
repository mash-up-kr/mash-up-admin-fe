import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilCallback } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { BackButton, Blocker, Button } from '@/components';
import * as Styled from './CreateSchedule.styled';
import { useHistory, useRefreshSelectorFamilyByKey, useToast } from '@/hooks';
import { getScheduleDetailPage, PATH } from '@/constants';
import { ScheduleTemplate } from '@/components/Schedule';
import { EventCreateRequest } from '@/types';
import {
  parseFormValuesToScheduleRequest,
  RecursivePartial,
  request,
  ScheduleFormValues,
} from '@/utils';

import * as api from '@/api';
import { ToastType } from '@/styles';
import { $modalByStorage, ModalKey } from '@/store';

const DEFAULT_SESSIONS: RecursivePartial<EventCreateRequest[]> = [
  {
    contentsCreateRequests: [{}],
  },
];

const CreateSchedule = () => {
  const { handleGoBack } = useHistory();

  const methods = useForm<ScheduleFormValues>({ defaultValues: { sessions: DEFAULT_SESSIONS } });

  const { handleSubmit, formState } = methods;
  const { handleAddToast } = useToast();
  const navigate = useNavigate();
  const refreshSelectorFamilyByKey = useRefreshSelectorFamilyByKey();

  const { isDirty, isSubmitting, isSubmitSuccessful } = formState;

  const handleSubmitForm = useRecoilCallback(({ set }) => async (data: ScheduleFormValues) => {
    const createScheduleRequest = parseFormValuesToScheduleRequest(data);

    if (createScheduleRequest.eventsCreateRequests.length === 0) {
      handleAddToast({
        type: 'error',
        message: '최소 한가지의 세션을 작성해야 합니다.',
      });

      return;
    }

    if (
      createScheduleRequest.eventsCreateRequests.some(
        ({ contentsCreateRequests }) => contentsCreateRequests.length === 0,
      )
    ) {
      handleAddToast({
        type: 'error',
        message: '콘텐츠가 작성되지 않은 세션이 있습니다.',
      });

      return;
    }

    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '저장하시겠습니까?',
        paragraph: '스케줄 내역에서 확인하실 수 있습니다.',
        confirmButtonLabel: '저장',
        handleClickConfirmButton: () => {
          request({
            requestFunc: () => {
              return api.createSchedule(createScheduleRequest);
            },
            errorHandler: handleAddToast,
            onSuccess: (response) => {
              const { scheduleId } = response.data;

              handleAddToast({
                type: ToastType.success,
                message: '성공적으로 스케줄을 추가했습니다.',
              });

              refreshSelectorFamilyByKey('schedules');
              navigate(getScheduleDetailPage(scheduleId));
            },
            onCompleted: () => {
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

  return (
    <>
      <FormProvider {...methods}>
        <Styled.CreateSchedulePage>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <BackButton label="목록 돌아가기" onClick={() => handleGoBack(PATH.SCHEDULE)} />
            <Styled.Header>
              <Styled.Headline>스케줄</Styled.Headline>
              <Styled.ButtonWrapper>
                <Button
                  $size="sm"
                  type="button"
                  shape="defaultLine"
                  isLoading={isSubmitting}
                  onClick={() => navigate(-1)}
                >
                  취소
                </Button>
                <Button $size="sm" shape="primary" type="submit" isLoading={isSubmitting}>
                  저장
                </Button>
              </Styled.ButtonWrapper>
            </Styled.Header>
            <ScheduleTemplate />
          </form>
        </Styled.CreateSchedulePage>
      </FormProvider>
      <Blocker isBlocking={isDirty && !isSubmitSuccessful} />
    </>
  );
};

export default CreateSchedule;
