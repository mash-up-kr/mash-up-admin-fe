import React from 'react';
import { useSetRecoilState } from 'recoil';
import UserProfile, {
  splitMemberPosition,
} from '@/components/common/UserProfile/UserProfile.component';
import { TitleWithContent } from '..';
import * as Styled from './MessageListPanel.styled';
import { Button } from '@/components';
import { EmailRequestItem, EmailTypes, ApplicationByIdResponseData, EmailStatus } from '@/types';
import { $modalByStorage, ModalKey } from '@/store';
import { formatDate } from '@/utils/date';

const MessageInfo = ({
  memo,
  emailRequestStatus,
  sendAt,
  senderPosition,
  templateName,
}: EmailRequestItem) => {
  return (
    <Styled.MessageInfoContainer>
      <Styled.Label status={emailRequestStatus}>{EmailStatus[emailRequestStatus]}</Styled.Label>
      <Styled.TitleContainer>
        <div>{memo}</div>
        <div>{formatDate(sendAt, 'YYYY년 M월 D일(ddd) a hh시 mm분')}</div>
      </Styled.TitleContainer>
      <TitleWithContent title="발송이메일">recruit.mashup@gmail.com</TitleWithContent>
      <TitleWithContent title="발송자">
        <UserProfile
          team={splitMemberPosition(senderPosition)[0]}
          role={splitMemberPosition(senderPosition)[1]}
          showBackground={false}
          removePadding
        />
      </TitleWithContent>
      <TitleWithContent title="발송내용">{EmailTypes[templateName]}</TitleWithContent>
    </Styled.MessageInfoContainer>
  );
};

export interface MessageListPanelProps {
  application: ApplicationByIdResponseData;
}

const MessageListPanel = ({ application }: MessageListPanelProps) => {
  const handleControlModal = useSetRecoilState($modalByStorage(ModalKey.emailSendModalDialog));
  const messageItems = application.applicationEmailResponses;

  return (
    <Styled.MessageListPanelContainer>
      <Styled.MessageListPanelTitle>
        <h3>이메일 발송내역</h3>
        <Button
          $size="xs"
          shape="defaultLine"
          onClick={() =>
            handleControlModal({
              key: ModalKey.emailSendModalDialog,
              props: {
                selectedApplications: [application],
              },
              isOpen: true,
            })
          }
        >
          이메일 발송
        </Button>
      </Styled.MessageListPanelTitle>
      {messageItems.length > 0 && (
        <Styled.MessageListPanelContent>
          {messageItems.map((each: any) => (
            <MessageInfo key={each?.emailRequestId} {...each} />
          ))}
        </Styled.MessageListPanelContent>
      )}
    </Styled.MessageListPanelContainer>
  );
};

export default MessageListPanel;
