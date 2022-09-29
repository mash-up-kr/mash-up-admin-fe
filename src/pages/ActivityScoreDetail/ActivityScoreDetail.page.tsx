import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { BackButton, Button, Table } from '@/components';
import * as Styled from './ActivityScoreDetail.styled';
import { useHistory, useToggleState } from '@/hooks';
import { PATH } from '@/constants';
import {
  ActivityScoreModalDialog,
  ApplyActivityScoreModalDialog,
  Icon,
  PersonalInfoCard,
  ScoreCard,
  ScoreType,
} from '@/components/ActivityScore';
import { TableColumn } from '@/components/common/Table/Table.component';
import { ScoreHistory, ValueOf } from '@/types';
import { ButtonShape } from '@/components/common/Button/Button.component';

import Plus from '@/assets/svg/plus-16.svg';
import { $memberDetail } from '@/store/member';

const ActivityScoreDetail = () => {
  const { handleGoBack } = useHistory();
  const [isActivityScoreModalOpened, toggleActivityScoreModalOpened] = useToggleState(false);
  const [isApplyActivityScoreModalOpened, toggleApplyActivityScoreModalOpened] =
    useToggleState(false);
  const { generationNumber: generationNumberParam, memberId: memberIdParam } =
    useParams<{ generationNumber: string; memberId: string }>();

  const columns: TableColumn<ScoreHistory>[] = [
    {
      title: '-',
      widthRatio: '7%',
      accessor: 'scoreType',
      renderCustomCell: (cellValue) => (
        <Styled.IconWrapper>
          <Icon type={cellValue as ValueOf<typeof ScoreType>} />
        </Styled.IconWrapper>
      ),
    },
    {
      title: '제목',
      widthRatio: '23%',
      accessor: ['scoreName', 'isCanceled'],
      renderCustomCell: (cellValue) => {
        const [scoreName, isCanceled] = cellValue as [string, boolean];

        return (
          <>
            <Styled.ActivityTitle isCanceled={isCanceled} onClick={toggleActivityScoreModalOpened}>
              {scoreName}
            </Styled.ActivityTitle>
            {isCanceled && <Styled.CancelLabel>취소</Styled.CancelLabel>}
          </>
        );
      },
    },
    {
      title: '세미나 정보',
      widthRatio: '23%',
      accessor: ['scheduleName', 'isCanceled'],
      renderCustomCell: (cellValue) => {
        const [scheduleName, isCanceled] = cellValue as [string, boolean];

        return <Styled.Column isCanceled={isCanceled}>{scheduleName}</Styled.Column>;
      },
    },
    {
      title: '등록 일시',
      widthRatio: '23%',
      accessor: ['date', 'isCanceled'],
      renderCustomCell: (cellValue) => {
        const [date, isCanceled] = cellValue as [string, boolean];

        return <Styled.Column isCanceled={isCanceled}>{date as string}</Styled.Column>;
      },
    },
    {
      title: '점수',
      widthRatio: '12%',
      accessor: ['score', 'isCanceled'],
      renderCustomCell: (cellValue) => {
        const [score, isCanceled] = cellValue as [string, boolean];

        return <Styled.Column isCanceled={isCanceled}>{score as string}</Styled.Column>;
      },
    },
    {
      title: '총 활동 점수',
      widthRatio: '12%',
      accessor: 'accumulatedScore',
    },
  ];

  const { name, platform, identification, generationNumber, totalScore, scoreHistoryResponses } =
    useRecoilValue(
      $memberDetail({
        generationNumber: generationNumberParam ?? '',
        memberId: memberIdParam ?? '',
      }),
    );

  return (
    <>
      <Styled.ActivityScoreDetailPage>
        <BackButton label="목록 돌아가기" onClick={() => handleGoBack(PATH.ACTIVITY_SCORE)} />
        <Styled.Headline>활동점수 상세</Styled.Headline>
        <Styled.Row>
          <PersonalInfoCard
            name={name}
            platform={platform}
            identification={identification}
            generationNumber={generationNumber}
          />
          <ScoreCard totalScore={totalScore} />
        </Styled.Row>
        <Styled.Content>
          <Styled.ContentHeader>
            <h3>활동점수 히스토리</h3>
            <Button
              shape={ButtonShape.defaultLine}
              label="점수 추가"
              Icon={Plus}
              onClick={toggleApplyActivityScoreModalOpened}
            />
          </Styled.ContentHeader>
          <Table
            prefix="score-history"
            columns={columns}
            rows={scoreHistoryResponses}
            supportBar={{}}
          />
        </Styled.Content>
      </Styled.ActivityScoreDetailPage>
      {isActivityScoreModalOpened && (
        <ActivityScoreModalDialog onClose={toggleActivityScoreModalOpened} />
      )}
      {isApplyActivityScoreModalOpened && (
        <ApplyActivityScoreModalDialog onClose={toggleApplyActivityScoreModalOpened} />
      )}
    </>
  );
};

export default ActivityScoreDetail;
