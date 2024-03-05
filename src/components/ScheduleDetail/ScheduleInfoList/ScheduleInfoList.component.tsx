import React, { useMemo } from 'react';
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
  location: {
    address: string | null;
    placeName: string;
  };
}

const ScheduleInfoList = ({
  name,
  generationNumber,
  startedAt,
  createdAt,
  publishedAt,
  status,
  location,
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
          location.address === null
            ? location.placeName
            : `${location.placeName}, ${location.address}`,
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
  }, [createdAt, generationNumber, name, publishedAt, startedAt, status, location]);

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
