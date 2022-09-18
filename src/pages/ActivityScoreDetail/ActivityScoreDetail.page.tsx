import React from 'react';
import { BackButton, Button, Table } from '@/components';
import * as Styled from './ActivityScoreDetail.styled';
import { useHistory } from '@/hooks';
import { PATH } from '@/constants';
import {
  Icon,
  PersonalInfoCard,
  ScoreCard,
  ScoreTitle,
  ScoreType,
} from '@/components/ActivityScore';
import { TableColumn } from '@/components/common/Table/Table.component';
import { ValueOf } from '@/types';
import { ButtonShape } from '@/components/common/Button/Button.component';

import Plus from '@/assets/svg/plus-20.svg';
import Minus from '@/assets/svg/minus-20.svg';

interface ScoreHistory {
  type: ValueOf<typeof ScoreType>;
  title: string;
  seminar: string;
  createdAt: string;
  score: string;
  totalScore: number;
}

const columns: TableColumn<ScoreHistory>[] = [
  {
    title: '-',
    widthRatio: '7%',
    accessor: 'type',
    renderCustomCell: (cellValue) => (
      <Styled.IconWrapper>
        <Icon type={cellValue as ValueOf<typeof ScoreType>} />
      </Styled.IconWrapper>
    ),
  },
  {
    title: '제목',
    widthRatio: '23%',
    accessor: 'title',
  },
  {
    title: '세미나 정보',
    widthRatio: '23%',
    accessor: 'seminar',
  },
  {
    title: '등록 일시',
    widthRatio: '23%',
    accessor: 'createdAt',
  },
  {
    title: '점수',
    widthRatio: '12%',
    accessor: 'score',
  },
  {
    title: '총 활동 점수',
    widthRatio: '12%',
    accessor: 'totalScore',
  },
];

const rows: ScoreHistory[] = Object.values(ScoreType).map((type) => ({
  type,
  title: ScoreTitle[type],
  seminar: '3차 전체 세미나',
  createdAt: '2022년 3월 2일 오후 2시 30분',
  score: '0',
  totalScore: 3,
}));

const ActivityScoreDetail = () => {
  const { handleGoBack } = useHistory();

  return (
    <Styled.ActivityScoreDetailPage>
      <BackButton label="목록 돌아가기" onClick={() => handleGoBack(PATH.ACTIVITY_SCORE)} />
      <Styled.Headline>출결점수</Styled.Headline>
      <Styled.Row>
        <PersonalInfoCard />
        <ScoreCard />
      </Styled.Row>
      <Styled.Content>
        <Styled.ContentHeader>
          <h3>활동점수 히스토리</h3>
          <Button shape={ButtonShape.defaultLine} label="점수 적용" Icon={Plus} />
          <Button shape={ButtonShape.defaultLine} label="점수 취소" Icon={Minus} />
        </Styled.ContentHeader>
        <Table prefix="score-history" columns={columns} rows={rows} supportBar={{}} />
      </Styled.Content>
    </Styled.ActivityScoreDetailPage>
  );
};

export default ActivityScoreDetail;
