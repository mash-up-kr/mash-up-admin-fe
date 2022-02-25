import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultipleSmsSendModalDialog, {
  MultipleSmsSendModalDialogProps,
} from './MultipleSmsSendModalDialog.component';

export default {
  title: 'modal/Multiple Sms Send Modal Dialog',
  component: MultipleSmsSendModalDialog,
} as ComponentMeta<typeof MultipleSmsSendModalDialog>;

const Template: ComponentStory<typeof MultipleSmsSendModalDialog> = (
  args: MultipleSmsSendModalDialogProps,
) => <MultipleSmsSendModalDialog {...args} />;

export const multipleSmsSendModalDialog = Template.bind({});

multipleSmsSendModalDialog.args = {
  selectedList: [0, 1, 2, 3, 4],
  confirmationStatus: 'FINAL_CONFIRM_ACCEPTED',
  resultStatus: 'SCREENING_PASSED',
};
