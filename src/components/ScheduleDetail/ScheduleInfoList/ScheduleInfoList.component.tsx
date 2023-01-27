import React from 'react';
import { ScheduleStatus, ValueOf } from '@/types';

import * as Styled from './ScheduleInfoList.styled';
import { formatDate, getScheduleStatusText } from '@/utils';

interface ScheduleInfoListProps {
  generationNumber: number;
  name: string;
  createdAt: string;
  startedAt: string;
  publishedAt?: string;
  status: ValueOf<typeof ScheduleStatus>;
}

const ScheduleInfoList = ({
  name,
  generationNumber,
  startedAt,
  createdAt,
  publishedAt,
  status,
}: ScheduleInfoListProps) => {
  return (
    <Styled.ScheduleInfoList>
      <li>
        <Styled.ScheduleInfoLabel>스케줄 명</Styled.ScheduleInfoLabel>
        <Styled.ScheduleInfoValue>{name}</Styled.ScheduleInfoValue>
      </li>
      <li>
        <Styled.ScheduleInfoLabel>기수</Styled.ScheduleInfoLabel>
        <Styled.ScheduleInfoValue>{generationNumber}기</Styled.ScheduleInfoValue>
      </li>
      <li>
        <Styled.ScheduleInfoLabel>스케줄 일시</Styled.ScheduleInfoLabel>
        <Styled.ScheduleInfoValue>
          {formatDate(startedAt, 'YYYY년 M월 D일 A hh시 mm분')}
        </Styled.ScheduleInfoValue>
      </li>
      <li>
        <Styled.ScheduleInfoLabel>등록 일시</Styled.ScheduleInfoLabel>
        <Styled.ScheduleInfoValue>
          {formatDate(createdAt, 'YYYY년 M월 D일 A hh시 mm분')}
        </Styled.ScheduleInfoValue>
      </li>
      <li>
        <Styled.ScheduleInfoLabel>배포 일시</Styled.ScheduleInfoLabel>
        <Styled.ScheduleInfoValue>
          {formatDate(publishedAt, 'YYYY년 M월 D일 A hh시 mm분')}
        </Styled.ScheduleInfoValue>
      </li>
      <li>
        <Styled.ScheduleInfoLabel>배포 상태</Styled.ScheduleInfoLabel>
        <Styled.ScheduleInfoValue>{getScheduleStatusText(status)}</Styled.ScheduleInfoValue>
      </li>
    </Styled.ScheduleInfoList>
  );
};

export default ScheduleInfoList;
