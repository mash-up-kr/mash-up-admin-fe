import React from 'react';
import { Session } from '@/types';
import * as Styled from './SessionListItem.styled';
import { ContentListItem, SessionTimeRange } from '..';

type SessionItemProps = Session;

const SessionListItem = ({ eventName, startedAt, endedAt, contentList }: SessionItemProps) => {
  return (
    <Styled.SessionListItem>
      <Styled.Header>
        <Styled.SessionTitle>{eventName}</Styled.SessionTitle>
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
