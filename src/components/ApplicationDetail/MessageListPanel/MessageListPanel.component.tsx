import React from 'react';
import UserProfile, {
  splitMemberPosition,
} from '@/components/common/UserProfile/UserProfile.component';
import { TitleWithContent } from '..';
import * as Styled from './MessageListPanel.styled';
import { convertToFormatDate, convertToFormatTime } from '@/utils';
import { Button } from '@/components';

export interface MessageInfoProps {
  notificationName: string;
  senderPhoneNumber: string;
  sender: string;
  notificationContent: string;
  smsRequestId: number;
  team: {
    createdAt: string;
  };
}

export interface MessageListPanelProps {
  smsRequests: MessageInfoProps[];
}

const MessageInfo = ({
  notificationName,
  senderPhoneNumber,
  sender,
  notificationContent,
  team,
}: MessageInfoProps) => {
  return (
    <Styled.MessageInfoContainer>
      <Styled.TitleContainer>
        <div>{notificationName}</div>
        <div>
          {convertToFormatDate(team.createdAt)}
          {convertToFormatTime(team.createdAt)}
        </div>
      </Styled.TitleContainer>
      <TitleWithContent title="발송번호">{senderPhoneNumber}</TitleWithContent>
      <TitleWithContent title="발송자">
        <UserProfile
          team={splitMemberPosition(sender)[0]}
          role={splitMemberPosition(sender)[1]}
          showBackground={false}
          removePadding
        />
      </TitleWithContent>
      <TitleWithContent title="발송내용">{notificationContent}</TitleWithContent>
    </Styled.MessageInfoContainer>
  );
};

const MessageListPanel = ({ smsRequests }: MessageListPanelProps) => {
  return (
    <Styled.MessageListPanelContainer>
      <Styled.MessageListPanelTitle>
        <h3>SMS 발송내역</h3>
        <Button $size="xs" shape="defaultLine">
          SMS 발송
        </Button>
      </Styled.MessageListPanelTitle>
      <Styled.MessageListPanelContent>
        {smsRequests.map((each: MessageInfoProps) => (
          <MessageInfo key={each.smsRequestId} {...each} />
        ))}
      </Styled.MessageListPanelContent>
    </Styled.MessageListPanelContainer>
  );
};

export default MessageListPanel;
