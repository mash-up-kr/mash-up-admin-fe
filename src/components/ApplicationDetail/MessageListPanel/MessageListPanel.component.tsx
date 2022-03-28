import React from 'react';
import { useSetRecoilState } from 'recoil';
import UserProfile, {
  splitMemberPosition,
} from '@/components/common/UserProfile/UserProfile.component';
import { TitleWithContent } from '..';
import * as Styled from './MessageListPanel.styled';
import { Button } from '@/components';
import { MemberPositionType, ApplicationResponse } from '@/types';
import { $modalByStorage, ModalKey } from '@/store';
import { formatDate } from '@/utils/date';
import { SmsStatus, SmsStatusType } from '@/types/dto/sms';

export interface MessageInfoProps {
  notificationName?: string;
  senderPhoneNumber?: string;
  sender?: MemberPositionType;
  notificationContent?: string;
  smsRequestId: number;
  status: SmsStatusType;
  team: {
    createdAt: string;
  };
}

const MessageInfo = ({
  notificationName,
  senderPhoneNumber,
  sender,
  notificationContent,
  status,
  team,
}: MessageInfoProps) => {
  return (
    <Styled.MessageInfoContainer>
      <Styled.Label status={status}>{SmsStatus[status]}</Styled.Label>
      <Styled.TitleContainer>
        <div>{notificationName}</div>
        <div>{formatDate(team.createdAt, 'YYYY년 M월 D일(ddd) a hh시 mm분')}</div>
      </Styled.TitleContainer>
      <TitleWithContent title="발송번호">{senderPhoneNumber}</TitleWithContent>
      <TitleWithContent title="발송자">
        <UserProfile
          team={splitMemberPosition(sender!)[0]}
          role={splitMemberPosition(sender!)[1]}
          showBackground={false}
          removePadding
        />
      </TitleWithContent>
      <TitleWithContent title="발송내용">{notificationContent}</TitleWithContent>
    </Styled.MessageInfoContainer>
  );
};

export interface MessageListPanelProps {
  smsRequests: MessageInfoProps[];
  application: ApplicationResponse;
}

const MessageListPanel = ({ smsRequests, application }: MessageListPanelProps) => {
  const handleControlModal = useSetRecoilState($modalByStorage(ModalKey.smsSendModalDialog));

  return (
    <Styled.MessageListPanelContainer>
      <Styled.MessageListPanelTitle>
        <h3>SMS 발송내역</h3>
        <Button
          $size="xs"
          shape="defaultLine"
          onClick={() =>
            handleControlModal({
              key: ModalKey.smsSendModalDialog,
              props: {
                selectedApplications: [application],
              },
              isOpen: true,
            })
          }
        >
          SMS 발송
        </Button>
      </Styled.MessageListPanelTitle>
      {smsRequests.length > 0 && (
        <Styled.MessageListPanelContent>
          {smsRequests.map((each: MessageInfoProps) => (
            <MessageInfo key={each.smsRequestId} {...each} />
          ))}
        </Styled.MessageListPanelContent>
      )}
    </Styled.MessageListPanelContainer>
  );
};

export default MessageListPanel;
