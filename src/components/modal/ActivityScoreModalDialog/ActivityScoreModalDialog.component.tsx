import React, { useState } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import * as Styled from './ActivityScoreModalDialog.styled';
import { Icon } from '@/components/ActivityScore';

import { RangeType, ScoreType } from '@/components/ActivityScore/constants';
import { $modalByStorage, ModalKey } from '@/store';
import { ScoreHistory, ValueOf } from '@/types';
import { parsePlaceholderWhenEmpty, request } from '@/utils';

import * as api from '@/api';
import { useToast } from '@/hooks';
import { ToastType } from '@/styles';
import { $memberDetail } from '@/store/member';

export interface ActivityScoreModalDialogProps {
  scoreHistory: ScoreHistory;
  generationNumber: number;
  memberId: number;
}

const ActivityScoreModalDialog = ({
  scoreHistory,
  generationNumber,
  memberId,
}: ActivityScoreModalDialogProps) => {
  const { scoreHistoryId, scoreType, scoreName, scheduleName, memo, accumulatedScore, score } =
    scoreHistory;

  const [isLoading, setIsLoading] = useState(false);
  const { handleAddToast } = useToast();

  const handleActivityScoreModal = useSetRecoilState(
    $modalByStorage(ModalKey.activityScoreModalDialog),
  );

  const handleCloseModal = () =>
    handleActivityScoreModal({ key: ModalKey.activityScoreModalDialog, isOpen: false });

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.activityScoreModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: false,
    });

    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: false,
    });
  });

  const handleCancelActivityScore = useRecoilCallback(({ set, refresh }) => async () => {
    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '점수를 취소하시겠습니까?',
        confirmButtonLabel: '적용',
        cancelButtonLabel: '닫기',
        handleClickConfirmButton: () => {
          request({
            requestFunc: async () => {
              setIsLoading(true);
              await api.postScoreHistoryCancel({ scoreHistoryId, memo: '' });
            },

            errorHandler: handleAddToast,
            onSuccess: () => {
              handleRemoveCurrentModal();
              handleAddToast({
                type: ToastType.success,
                message: '점수가 취소되었습니다.',
              });

              refresh(
                $memberDetail({
                  generationNumber,
                  memberId,
                }),
              );
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

  return (
    <Styled.ActivityScoreModalWrapper
      heading="활동점수 상세"
      handleCloseModal={handleCloseModal}
      footer={{
        confirmButton: { label: '점수 취소하기', onClick: handleCancelActivityScore, isLoading },
        position: 'center',
      }}
    >
      <Styled.ModalInner>
        <Styled.DetailCard>
          <Icon type={scoreType as ValueOf<typeof ScoreType>} size={64} />
          <Styled.ActivityTitle>{scoreName}</Styled.ActivityTitle>
          <Styled.Divider />
          <Styled.Content>
            <Styled.Row>
              <Styled.RowLabel>세미나 정보</Styled.RowLabel>
              <Styled.RowContent>{parsePlaceholderWhenEmpty(scheduleName)}</Styled.RowContent>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>등록일시</Styled.RowLabel>
              <Styled.RowContent>2022년 3월 2일 오후 2시 30분</Styled.RowContent>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>메모</Styled.RowLabel>
              <Styled.RowContent>{parsePlaceholderWhenEmpty(memo)}</Styled.RowContent>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>점수</Styled.RowLabel>
              <Styled.ScoreRangeType type={RangeType.Minus}>{score}</Styled.ScoreRangeType>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>총 활동점수</Styled.RowLabel>
              <Styled.RowContent>{accumulatedScore}</Styled.RowContent>
            </Styled.Row>
          </Styled.Content>
        </Styled.DetailCard>
      </Styled.ModalInner>
    </Styled.ActivityScoreModalWrapper>
  );
};

export default ActivityScoreModalDialog;
