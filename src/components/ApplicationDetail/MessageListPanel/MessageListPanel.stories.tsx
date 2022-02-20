import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageListPanel, { MessageListPanelProps } from './MessageListPanel.component';

export default {
  title: 'ApplicationDetail/MessageList Panel',
  component: MessageListPanel,
} as ComponentMeta<typeof MessageListPanel>;

const Template: ComponentStory<typeof MessageListPanel> = (args: MessageListPanelProps) => (
  <MessageListPanel {...args} />
);

export const messageListPanel = Template.bind({});

messageListPanel.args = {
  smsRequests: [
    {
      notificationName: 'TEST',
      senderPhoneNumber: 'TEST',
      sender: 'MASHUP_LEADER',
      notificationContent: 'TEST TEST',
      smsRequestId: 0,
      team: {
        createdAt: '2022-02-19T05:43:38.517Z',
      },
    },
    {
      notificationName: 'TEST',
      senderPhoneNumber: 'TEST',
      sender: 'MASHUP_LEADER',
      notificationContent: 'TEST TEST',
      smsRequestId: 0,
      team: {
        createdAt: '2022-02-19T05:43:38.517Z',
      },
    },
  ],
};
