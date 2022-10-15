import React from 'react';
import { useSetRecoilState } from 'recoil';
import * as Styled from './ActivityScoreModalDialog.styled';
import { Icon } from '@/components/ActivityScore';

import { RangeType, ScoreType } from '@/components/ActivityScore/constants';
import { $modalByStorage, ModalKey } from '@/store';
import { ScoreHistory, ValueOf } from '@/types';
import { parsePlaceholderWhenEmpty } from '@/utils';

export interface ActivityScoreModalDialogProps {
  scoreHistory: ScoreHistory;
}

const ActivityScoreModalDialog = ({ scoreHistory }: ActivityScoreModalDialogProps) => {
  const handleActivityScoreModal = useSetRecoilState(
    $modalByStorage(ModalKey.activityScoreModalDialog),
  );

  const handleCloseModal = () =>
    handleActivityScoreModal({ key: ModalKey.activityScoreModalDialog, isOpen: false });

  const handleCancel = () => {
    // TODO(@mango906): 취소하기 로직 작성 필요
  };

  const { scoreType, scoreName, scheduleName, memo, accumulatedScore, score } = scoreHistory;

  return (
    <Styled.ActivityScoreModalWrapper
      heading="활동점수 상세"
      handleCloseModal={handleCloseModal}
      footer={{
        confirmButton: { label: '점수 취소하기', onClick: handleCancel },
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
