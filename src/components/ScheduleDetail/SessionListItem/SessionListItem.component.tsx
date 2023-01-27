import React from 'react';
import { Session } from '@/types';
import * as Styled from './SessionListItem.styled';
import { ContentListItem, SessionTimeRange } from '..';

type SessionItemProps = Session;

const SessionListItem = ({ startedAt, endedAt, contentList }: SessionItemProps) => {
  return (
    <Styled.SessionListItem>
      <Styled.Header>
        {/* TODO(@mango906): 세션 이름 서버로 부터 내려오게 되면 변경해주기 */}
        <Styled.SessionTitle>세션 제목</Styled.SessionTitle>
        <SessionTimeRange startedAt={startedAt} endedAt={endedAt} />
      </Styled.Header>
      <Styled.ContentList>
        {contentList.map((content, index) => (
          <ContentListItem key={content.contentId} index={index} {...content} />
        ))}
      </Styled.ContentList>
    </Styled.SessionListItem>
  );
};

export default SessionListItem;
