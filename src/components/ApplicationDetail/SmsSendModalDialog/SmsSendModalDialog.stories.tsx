import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SmsSendModalDialog, { SmsSendModalDialogProps } from './SmsSendModalDialog.component';

export default {
  title: 'ApplicationDetail/Sms Send Modal Dialog',
  component: SmsSendModalDialog,
} as ComponentMeta<typeof SmsSendModalDialog>;

const Template: ComponentStory<typeof SmsSendModalDialog> = (args: SmsSendModalDialogProps) => (
  <SmsSendModalDialog {...args} />
);

export const smsSendModalDialog = Template.bind({});

smsSendModalDialog.args = {
  id: '1',
};
