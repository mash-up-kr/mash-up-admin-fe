import React from 'react';
import * as Styled from './ActivityScoreModalDialog.styled';
import { Icon, ScoreTitle, ScoreType } from '..';

interface ActivityScoreModalDialogProps {
  onClose: () => void;
}

const ActivityScoreModalDialog = ({ onClose }: ActivityScoreModalDialogProps) => {
  const handleCancel = () => {
    // TODO(@mango906): 취소하기 로직 작성 필요
  };

  return (
    <Styled.ActivityScoreModalWrapper
      heading="활동점수 상세"
      handleCloseModal={onClose}
      footer={{
        confirmButton: { label: '점수 취소하기', onClick: handleCancel },
        position: 'center',
      }}
    >
      <Styled.ModalInner>
        <Styled.DetailCard>
          <Icon type={ScoreType.ATTENDANCE} size={64} />
          <Styled.ActivityTitle>{ScoreTitle[ScoreType.ATTENDANCE]}</Styled.ActivityTitle>
          <Styled.Divider />
          <Styled.Content>
            <Styled.Row>
              <Styled.RowLabel>세미나 정보</Styled.RowLabel>
              <Styled.RowContent>3차 전체 세미나</Styled.RowContent>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>등록일시</Styled.RowLabel>
              <Styled.RowContent>2022년 3월 2일 오후 2시 30분</Styled.RowContent>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>메모</Styled.RowLabel>
              <Styled.RowContent>
                제 시간에 출석을 했었다 날이 좋아서 날이 좋지 않아서 출석 점수를 줘버렸다..
              </Styled.RowContent>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>점수</Styled.RowLabel>
              <Styled.ScoreRangeType type={Styled.RangeType.Minus}>-0.5</Styled.ScoreRangeType>
            </Styled.Row>
            <Styled.Row>
              <Styled.RowLabel>총 활동점수</Styled.RowLabel>
              <Styled.RowContent>0</Styled.RowContent>
            </Styled.Row>
          </Styled.Content>
        </Styled.DetailCard>
      </Styled.ModalInner>
    </Styled.ActivityScoreModalWrapper>
  );
};

export default ActivityScoreModalDialog;
