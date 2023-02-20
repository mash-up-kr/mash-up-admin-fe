import React from 'react';
import * as Styled from './SessionTimeRange.styled';
import Clock from '@/assets/svg/clock-16.svg';
import { formatDate } from '@/utils';

interface SessionTimeRangeProps {
  startedAt: string;
  endedAt: string;
}

const SessionTimeRange = ({ startedAt, endedAt }: SessionTimeRangeProps) => {
  return (
    <Styled.SessionTimeRange>
      <Clock />
      {formatDate(startedAt, 'A hh:mm')} - {formatDate(endedAt, 'A hh:mm')}
    </Styled.SessionTimeRange>
  );
};

export default SessionTimeRange;
