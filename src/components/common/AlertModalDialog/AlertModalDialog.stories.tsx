import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AlertModalDialog, {
  AlertModalDialogProps,
  SMS_COMPLETE,
  POPUP_CLOSE,
} from './AlertModalDialog.component';

export default {
  title: 'AlertModalDialog',
} as ComponentMeta<typeof AlertModalDialog>;

const Template: ComponentStory<typeof AlertModalDialog> = (args: AlertModalDialogProps) => {
  return <AlertModalDialog {...args} />;
};

export const SmsComplete = Template.bind({});
SmsComplete.args = SMS_COMPLETE;

export const PopupClose = Template.bind({});
PopupClose.args = POPUP_CLOSE;
