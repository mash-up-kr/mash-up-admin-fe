import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SmsSendDetailListModalDialog from './SmsSendDetailListModalDialog.component';

export default {
  title: 'Modal/Sms Send Detail List Modal Dialog',
  component: SmsSendDetailListModalDialog,
} as ComponentMeta<typeof SmsSendDetailListModalDialog>;

const Template: ComponentStory<typeof SmsSendDetailListModalDialog> = () => (
  <SmsSendDetailListModalDialog selectedApplications={[]} />
);

export const smsSendDetailListModalDialog = Template.bind({});
