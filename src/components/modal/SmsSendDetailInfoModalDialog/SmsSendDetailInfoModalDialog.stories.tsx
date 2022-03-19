import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SmsSendDetailInfoModalDialog from './SmsSendDetailInfoModalDialog.component';

export default {
  title: 'Modal/Sms Send Detail Info Modal Dialog',
  component: SmsSendDetailInfoModalDialog,
} as ComponentMeta<typeof SmsSendDetailInfoModalDialog>;

const Template: ComponentStory<typeof SmsSendDetailInfoModalDialog> = () => (
  <SmsSendDetailInfoModalDialog />
);

export const smsSendDetailInfoModalDialog = Template.bind({});
