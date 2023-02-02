import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { $modalByStorage, $scheduleDetail, ModalKey } from '@/store';
import * as Styled from './UpdateSchedulePage.styled';
import { BackButton, Blocker, Button } from '@/components';
import { useHistory, useRefreshSelectorFamilyByKey, useToast } from '@/hooks';
import { getScheduleDetailPage, PATH } from '@/constants';
import { ScheduleTemplate } from '@/components/Schedule';
import * as api from '@/api';
import {
  parseFormValuesToScheduleRequest,
  parseScheduleResponseToFormValues,
  request,
  ScheduleFormValues,
} from '@/utils';

import { ToastType } from '@/styles';

const UpdateSchedule = () => {
  const { scheduleId } = useParams();

  const scheduleResponse = useRecoilValue($scheduleDetail({ scheduleId: scheduleId ?? '' }));

  const defaultFormValues = useMemo(() => {
    return parseScheduleResponseToFormValues(scheduleResponse);
  }, [scheduleResponse]);

  const navigate = useNavigate();
  const { handleGoBack } = useHistory();
  const { handleAddToast } = useToast();
  const refreshSelectorFamilyByKey = useRefreshSelectorFamilyByKey();

  const methods = useForm<ScheduleFormValues>({ defaultValues: defaultFormValues });

  const { handleSubmit, formState } = methods;

  const { isDirty, isSubmitting, isSubmitSuccessful } = formState;

  const handleSubmitForm: SubmitHandler<ScheduleFormValues> = useRecoilCallback(
    ({ set }) =>
      async (data) => {
        const updateScheduleRequest = parseFormValuesToScheduleRequest(data);

        if (!scheduleId) {
          return;
        }

        if (updateScheduleRequest.eventsCreateRequests.length === 0) {
          handleAddToast({
            type: 'error',
            message: '최소 한가지의 세션을 작성해야 합니다.',
          });

          return;
        }

        if (
          updateScheduleRequest.eventsCreateRequests.some(
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
                  return api.updateSchedule(scheduleId, updateScheduleRequest);
                },
                errorHandler: handleAddToast,
                onSuccess: () => {
                  handleAddToast({
                    type: ToastType.success,
                    message: '성공적으로 스케줄을 추가했습니다.',
                  });

                  refreshSelectorFamilyByKey('schedules');
                  refreshSelectorFamilyByKey('scheduleDetail');
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
      },
  );

  return (
    <>
      <FormProvider {...methods}>
        <Styled.UpdateSchedulePage>
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
                  onClick={() => handleGoBack(PATH.SCHEDULE)}
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
        </Styled.UpdateSchedulePage>
      </FormProvider>
      <Blocker isBlocking={isDirty && !isSubmitSuccessful} />
    </>
  );
};

export default UpdateSchedule;
