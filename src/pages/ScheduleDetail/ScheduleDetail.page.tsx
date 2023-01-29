import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BackButton, Button } from '@/components';
import * as Styled from './ScheduleDetail.styled';
import { $scheduleDetail } from '@/store';
import { ScheduleInfoList, SessionListItem } from '@/components/ScheduleDetail';
import { useHistory } from '@/hooks';
import { getScheduleUpdatePage, PATH } from '@/constants';

const ScheduleDetail = () => {
  const { scheduleId = '' } = useParams();

  const { handleGoBack } = useHistory();
  const navigate = useNavigate();

  const {
    name,
    generationNumber,
    startedAt,
    createdAt,
    publishedAt,
    status,
    eventList: sessionList,
  } = useRecoilValue($scheduleDetail({ scheduleId: scheduleId ?? '' }));

  return (
    <Styled.ScheduleDetailPage>
      <BackButton onClick={() => handleGoBack(PATH.SCHEDULE)} />
      <Styled.Header>
        <h2>스케줄 상세</h2>
        <Styled.ButtonWrapper>
          <Button $size="sm" shape="defaultLine">
            삭제
          </Button>
          <Button
            $size="sm"
            shape="primaryLine"
            onClick={() => navigate(getScheduleUpdatePage(scheduleId))}
          >
            수정
          </Button>
          <Button $size="sm" shape="primary">
            배포
          </Button>
        </Styled.ButtonWrapper>
      </Styled.Header>
      <Styled.Content>
        <h3>스케줄 정보</h3>
        <ScheduleInfoList
          name={name}
          generationNumber={generationNumber}
          startedAt={startedAt}
          createdAt={createdAt}
          publishedAt={publishedAt}
          status={status}
        />
      </Styled.Content>
      <Styled.Content>
        <h3>세션 정보</h3>
        <Styled.SessionList>
          {sessionList.map((session) => (
            <SessionListItem key={session.eventId} {...session} />
          ))}
        </Styled.SessionList>
      </Styled.Content>
    </Styled.ScheduleDetailPage>
  );
};

export default ScheduleDetail;
