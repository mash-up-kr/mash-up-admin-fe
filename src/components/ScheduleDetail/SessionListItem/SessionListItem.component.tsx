import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Session } from '@/types';
import * as Styled from './SessionListItem.styled';
import { ContentListItem, SessionTimeRange } from '..';
import { Button } from '@/components';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { $modalByStorage, ModalKey } from '@/store';

type SessionItemProps = Session & { scheduleId: number };

const SessionListItem = ({
  scheduleId,
  eventId,
  eventName,
  startedAt,
  endedAt,
  contentList,
}: SessionItemProps) => {
  const handleQRCodeModal = useSetRecoilState($modalByStorage(ModalKey.createQRCodeModalDialog));

  return (
    <Styled.SessionListItem>
      <Styled.Header>
        <Styled.SessionTitle>{eventName}</Styled.SessionTitle>
        <Styled.ButtonWrapper>
          <Button
            type="button"
            $size={ButtonSize.xs}
            shape={ButtonShape.primary}
            label="QR 만들기"
            onClick={() =>
              handleQRCodeModal({
                key: ModalKey.createQRCodeModalDialog,
                isOpen: true,
                props: {
                  scheduleId,
                  eventId,
                  sessionStartedAt: startedAt,
                  sessionEndedAt: endedAt,
                },
              })
            }
          />
        </Styled.ButtonWrapper>
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
