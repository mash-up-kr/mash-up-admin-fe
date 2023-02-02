import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { BackButton, Button } from '@/components';
import * as Styled from './ScheduleDetail.styled';
import { $modalByStorage, $scheduleDetail, ModalKey } from '@/store';
import { ScheduleInfoList, SessionListItem } from '@/components/ScheduleDetail';
import { useHistory, useRefreshSelectorFamilyByKey, useToast } from '@/hooks';
import { getScheduleUpdatePage, PATH } from '@/constants';
import { ScheduleStatus } from '@/types/dto/schedule';
import { request } from '@/utils';

import * as api from '@/api';
import { ToastType } from '@/styles';

const ScheduleDetail = () => {
  const { scheduleId = '' } = useParams();

  const { handleGoBack } = useHistory();
  const navigate = useNavigate();
  const { handleAddToast } = useToast();
  const refreshSelectorFamilyByKey = useRefreshSelectorFamilyByKey();

  const {
    name,
    generationNumber,
    startedAt,
    createdAt,
    publishedAt,
    status,
    eventList: sessionList,
  } = useRecoilValue($scheduleDetail({ scheduleId: scheduleId ?? '' }));

  const isPublished = status === ScheduleStatus.PUBLIC;

  const handlePublishOrHideSchedule = useRecoilCallback(({ set, refresh }) => async () => {
    const heading = isPublished ? '스케줄을 배포 취소하시겠습니까?' : '스케줄을 배포하시겠습니까?';
    const toastMessage = isPublished
      ? '성공적으로 스케줄의 배포를 취소했습니다'
      : '성공적으로 스케줄을 배포하였습니다.';

    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading,
        confirmButtonLabel: '확인',
        handleClickConfirmButton: () => {
          request({
            requestFunc: () => {
              if (isPublished) {
                return api.hideSchedule(scheduleId);
              }

              return api.publishSchedule(scheduleId);
            },
            errorHandler: handleAddToast,
            onSuccess: () => {
              handleAddToast({
                type: ToastType.success,
                message: toastMessage,
              });

              refresh($scheduleDetail({ scheduleId: scheduleId ?? '' }));
              refreshSelectorFamilyByKey('schedules');
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

  const handleDeleteSchedule = useRecoilCallback(({ set }) => async () => {
    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '스케줄을 삭제하시겠습니까?',
        paragraph: '작성 또는 수정하신 데이터가 삭제됩니다.',
        confirmButtonLabel: '삭제',
        handleClickConfirmButton: () => {
          request({
            requestFunc: () => {
              return api.deleteSchedule(scheduleId);
            },
            errorHandler: handleAddToast,
            onSuccess: () => {
              handleAddToast({
                type: ToastType.success,
                message: '성공적으로 스케줄을 삭제했습니다.',
              });

              refreshSelectorFamilyByKey('schedules');
              navigate(PATH.SCHEDULE);
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
    <Styled.ScheduleDetailPage>
      <BackButton onClick={() => handleGoBack(PATH.SCHEDULE)} />
      <Styled.Header>
        <h2>스케줄 상세</h2>
        <Styled.ButtonWrapper>
          <Button
            $size="sm"
            shape="defaultLine"
            disabled={isPublished}
            onClick={handleDeleteSchedule}
          >
            삭제
          </Button>
          <Button
            $size="sm"
            shape="primaryLine"
            onClick={() => navigate(getScheduleUpdatePage(scheduleId))}
            disabled={isPublished}
          >
            수정
          </Button>
          <Button $size="sm" shape="primary" onClick={handlePublishOrHideSchedule}>
            {isPublished ? '배포 취소' : '배포'}
          </Button>
        </Styled.ButtonWrapper>
      </Styled.Header>
      <Styled.Content>
        <h3>스케줄 정보</h3>
        <ScheduleInfoList
          name={name}
          generationNumber={generationNumber}
          startedAt={startedAt}
          createdAt={createdAt}
          publishedAt={publishedAt}
          status={status}
        />
      </Styled.Content>
      <Styled.Content>
        <h3>세션 정보</h3>
        <Styled.SessionList>
          {sessionList.map((session) => (
            <SessionListItem key={session.eventId} {...session} />
          ))}
        </Styled.SessionList>
      </Styled.Content>
    </Styled.ScheduleDetailPage>
  );
};

export default ScheduleDetail;
