import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SmsSendModalDialog, { SmsSendModalDialogProps } from './SmsSendModalDialog.component';

export default {
  title: 'common/Sms Send Modal Dialog',
  component: SmsSendModalDialog,
} as ComponentMeta<typeof SmsSendModalDialog>;

const Template: ComponentStory<typeof SmsSendModalDialog> = (args: SmsSendModalDialogProps) => (
  <SmsSendModalDialog {...args} />
);

export const smsSendModalDialogNormal = Template.bind({});

smsSendModalDialogNormal.args = {
  selectedList: [0],
};

export const smsSendModalDialogWithResult = Template.bind({});

smsSendModalDialogWithResult.args = {
  selectedList: [0, 4],
  selectedConfirmStatuses: ['FINAL_CONFIRM_ACCEPTED'],
  selectedResults: ['SCREENING_PASSED'],
};

export const smsSendModalDialogSendFailure = Template.bind({});

smsSendModalDialogSendFailure.args = {
  selectedList: [0, 1, 2, 3, 4],
  selectedConfirmStatuses: ['FINAL_CONFIRM_ACCEPTED'],
  selectedResults: ['SCREENING_PASSED'],
  isSendFailed: true,
  messageContent: 'ABCD',
};
