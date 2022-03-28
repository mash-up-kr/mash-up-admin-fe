import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SmsSendDetailInfoModalDialog from './SmsSendDetailInfoModalDialog.component';

export default {
  title: 'Modal/Sms Send Detail Info Modal Dialog',
  component: SmsSendDetailInfoModalDialog,
} as ComponentMeta<typeof SmsSendDetailInfoModalDialog>;

const Template: ComponentStory<typeof SmsSendDetailInfoModalDialog> = () => (
  <SmsSendDetailInfoModalDialog
    sms={{
      content: '합격을 축하행~!',
      failureCount: 11,
      name: '스프링팀 서류 합격 문자 안내',
      notificationId: 1,
      sender: 'ANDROID_HELPER',
      senderPhoneNumber: '01012341234',
      sentAt: '2022-03-28T02:34:25.083Z',
      smsRequests: [
        {
          recipientName: '홍길동',
          recipientPhoneNumber: '01000000000',
          smsRequestId: 1,
          status: 'SUCCESS',
          team: {
            createdAt: '2022-03-28T02:34:25.083Z',
            createdBy: 'string',
            name: 'string',
            teamId: 0,
            updatedAt: '2022-03-28T02:34:25.083Z',
            updatedBy: 'string',
          },
        },
      ],
      status: 'CREATED',
      successCount: 209,
      totalCount: 220,
    }}
  />
);

export const smsSendDetailInfoModalDialog = Template.bind({});
