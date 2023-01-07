import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageListPanel, { MessageListPanelProps } from './MessageListPanel.component';

export default {
  title: 'ApplicationDetail/Message List Panel',
  component: MessageListPanel,
} as ComponentMeta<typeof MessageListPanel>;

const Template: ComponentStory<typeof MessageListPanel> = (args: MessageListPanelProps) => (
  <MessageListPanel {...args} />
);

export const messageListPanel = Template.bind({});

messageListPanel.args = {
  // @ts-ignore (바인딩 되지 않는 `application`의 필드 생략)
  application: {
    emailRequests: [
      {
        emailNotificationId: '2798',
        emailRequestId: '2799',
        emailRequestStatus: 'SUCCESS',
        memo: '서류 면접 결과 안내 발송 메모',
        sendAt: '2023-01-07T18:57:59',
        senderPosition: 'BRANDING_MEMBER',
        templateName: 'INTERVIEW_RESULT',
      },
    ],
  },
};
