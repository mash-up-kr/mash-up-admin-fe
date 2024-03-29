import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { BackButton, Button, Table } from '@/components';
import * as Styled from './ActivityScoreDetail.styled';
import { useHistory } from '@/hooks';
import { PATH } from '@/constants';
import {
  getScoreRangeType,
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
import { $modalByStorage, ModalKey } from '@/store';
import { formatDate, parsePlaceholderWhenEmpty, parseUrlParam } from '@/utils';

const ActivityScoreDetail = () => {
  const { handleGoBack } = useHistory();
  const { generationNumber: generationNumberParam, memberId: memberIdParam } = useParams();

  const handleApplyActivityScoreModal = useSetRecoilState(
    $modalByStorage(ModalKey.applyActivityScoreModalDialog),
  );

  const handleActivityScoreModal = useSetRecoilState(
    $modalByStorage(ModalKey.activityScoreModalDialog),
  );

  const columns: TableColumn<ScoreHistory>[] = [
    {
      title: '',
      widthRatio: '7%',
      accessor: 'scoreType',
      renderCustomCell: ({ cellValue }) => (
        <Styled.IconWrapper>
          <Icon type={cellValue as ValueOf<typeof ScoreType>} />
        </Styled.IconWrapper>
      ),
    },
    {
      title: '제목',
      widthRatio: '19%',
      textAlign: 'start',
      accessor: [
        'accumulatedScore',
        'date',
        'isCanceled',
        'memo',
        'scheduleName',
        'score',
        'scoreHistoryId',
        'scoreName',
        'scoreType',
      ],
      renderCustomCell: ({ cellValue }) => {
        const [
          accumulatedScore,
          date,
          isCanceled,
          memo,
          scheduleName,
          score,
          scoreHistoryId,
          scoreName,
          scoreType,
        ] = cellValue as [number, string, boolean, string, string, number, number, string, string];

        const scoreHistory = {
          accumulatedScore,
          date,
          isCanceled,
          memo,
          scheduleName,
          score,
          scoreHistoryId,
          scoreName,
          scoreType,
        };

        return (
          <>
            <Styled.ActivityTitle
              isCanceled={isCanceled}
              onClick={() =>
                handleActivityScoreModal({
                  key: ModalKey.activityScoreModalDialog,
                  isOpen: true,
                  props: {
                    scoreHistory,
                    generationNumber: parseUrlParam(generationNumberParam),
                    memberId: parseUrlParam(memberIdParam),
                  },
                })
              }
            >
              {scoreName}
            </Styled.ActivityTitle>
            {isCanceled && <Styled.CancelLabel>취소</Styled.CancelLabel>}
          </>
        );
      },
    },
    {
      title: '세미나 정보',
      widthRatio: '20%',
      accessor: ['scheduleName', 'isCanceled'],
      renderCustomCell: ({ cellValue }) => {
        const [scheduleName, isCanceled] = cellValue as [string, boolean];

        return (
          <Styled.Column isCanceled={isCanceled}>
            {parsePlaceholderWhenEmpty(scheduleName)}
          </Styled.Column>
        );
      },
    },
    {
      title: '일시',
      widthRatio: '20%',
      accessor: ['date', 'isCanceled'],
      renderCustomCell: ({ cellValue }) => {
        const [date, isCanceled] = cellValue as [string, boolean];

        return (
          <Styled.Column isCanceled={isCanceled}>
            {formatDate(date as string, 'YYYY년 M월 D일 hh시 mm분')}
          </Styled.Column>
        );
      },
    },
    {
      title: '메모',
      widthRatio: '20%',
      accessor: ['memo', 'isCanceled'],
      renderCustomCell: ({ cellValue }) => {
        const [memo, isCanceled] = cellValue as [string, boolean];

        return (
          <Styled.MemoColumn isCanceled={isCanceled}>
            {parsePlaceholderWhenEmpty(memo)}
          </Styled.MemoColumn>
        );
      },
    },
    {
      title: '점수',
      widthRatio: '7%',
      accessor: ['score', 'isCanceled'],
      renderCustomCell: ({ cellValue }) => {
        const [score, isCanceled] = cellValue as [number, boolean];

        return (
          <Styled.ScoreColumn type={getScoreRangeType(score)} isCanceled={isCanceled}>
            {score}
          </Styled.ScoreColumn>
        );
      },
    },
    {
      title: '총 점수',
      widthRatio: '7%',
      accessor: 'accumulatedScore',
    },
  ];

  const { name, platform, identification, generationNumber, totalScore, scoreHistoryResponses } =
    useRecoilValue(
      $memberDetail({
        generationNumber: parseUrlParam(generationNumberParam),
        memberId: parseUrlParam(memberIdParam),
      }),
    );

  return (
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
            $size="xs"
            onClick={() => {
              handleApplyActivityScoreModal({
                key: ModalKey.applyActivityScoreModalDialog,
                isOpen: true,
                props: {
                  generationNumber: parseUrlParam(generationNumberParam),
                  memberId: parseUrlParam(memberIdParam),
                },
              });
            }}
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
  );
};

export default ActivityScoreDetail;
