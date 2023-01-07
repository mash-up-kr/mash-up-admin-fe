import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmailSendDetailInfoModalDialog from './SmsSendDetailInfoModalDialog.component';

export default {
  title: 'Modal/Email Send Detail Info Modal Dialog',
  component: EmailSendDetailInfoModalDialog,
} as ComponentMeta<typeof EmailSendDetailInfoModalDialog>;

const Template: ComponentStory<typeof EmailSendDetailInfoModalDialog> = () => (
  <EmailSendDetailInfoModalDialog
    email={{
      emailNotificationId: 1,
      emailRequests: [
        {
          applicationId: 0,
          emailRequestId: 1,
          recipientEmail: 'hongildong@gmail.com',
          recipientName: '홍길동',
          status: 'CREATED',
          team: '디자인',
        },
      ],
      failureCount: 1,
      name: '메모',
      sendAt: '2023-01-07T02:34:25.083Z',
      sender: 'ANDROID_HELPER',
      successCount: 99,
      totalCount: 100,
      type: 'INTERVIEW_DELAY',
    }}
  />
);

export const emailSendDetailInfoModalDialog = Template.bind({});
