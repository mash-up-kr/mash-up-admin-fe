import React, { useMemo } from 'react';
import { ScheduleStatus, ValueOf } from '@/types';

import * as Styled from './ScheduleInfoList.styled';
import { formatDate, getScheduleStatusText, getScheduleType, SchedulePlatformType } from '@/utils';

interface ScheduleInfoListProps {
  generationNumber: number;
  scheduleType: ValueOf<typeof SchedulePlatformType>;
  name: string;
  createdAt: string;
  startedAt: string;
  publishedAt?: string;
  status: ValueOf<typeof ScheduleStatus>;
  location: {
    roadAddress?: string | null;
    detailAddress: string;
  };
  notice: string | null;
}

const ScheduleInfoList = ({
  name,
  generationNumber,
  scheduleType,
  startedAt,
  createdAt,
  publishedAt,
  status,
  location,
  notice,
}: ScheduleInfoListProps) => {
  const scheduleInfoListItem = useMemo(() => {
    return [
      {
        label: '스케줄 명',
        value: name,
      },
      {
        label: '기수',
        value: `${generationNumber}기`,
      },
      {
        label: '구분',
        value: getScheduleType(scheduleType),
      },
      {
        label: '스케줄 일시',
        value: formatDate(startedAt, 'YYYY년 M월 D일 A hh시 mm분'),
      },
      {
        label: '등록 일시',
        value: formatDate(createdAt, 'YYYY년 M월 D일 A hh시 mm분'),
      },
      {
        label: '장소',
        value:
          location.roadAddress === null
            ? location.detailAddress // ZOOM
            : `${location.roadAddress}${
                location.detailAddress ? `, ${location.detailAddress}` : ''
              }`,
      },
      {
        label: '공지',
        value: notice || '-',
      },
      {
        label: '배포 일시',
        value: formatDate(publishedAt, 'YYYY년 M월 D일 A hh시 mm분'),
      },
      {
        label: '배포 상태',
        value: getScheduleStatusText(status),
      },
    ];
  }, [
    createdAt,
    generationNumber,
    location.detailAddress,
    location.roadAddress,
    name,
    notice,
    publishedAt,
    scheduleType,
    startedAt,
    status,
  ]);

  return (
    <Styled.ScheduleInfoList>
      {scheduleInfoListItem.map(({ label, value }) => (
        <li key={label}>
          <Styled.ScheduleInfoLabel>{label}</Styled.ScheduleInfoLabel>
          <Styled.ScheduleInfoValue>{value}</Styled.ScheduleInfoValue>
        </li>
      ))}
    </Styled.ScheduleInfoList>
  );
};

export default ScheduleInfoList;
