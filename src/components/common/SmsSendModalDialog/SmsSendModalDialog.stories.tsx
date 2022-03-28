import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SmsSendModalDialog, { SmsSendModalDialogProps } from './SmsSendModalDialog.component';
import { ApplicationConfirmationStatusInDto, ApplicationResultStatusInDto } from '@/types';

const mockApplication = {
  applicant: {
    applicantId: 0,
    createdAt: '2022-02-19T10:06:37.439Z',
    email: 'string',
    name: 'string',
    phoneNumber: 'string',
    status: 'ACTIVE',
    updatedAt: '2022-02-19T10:06:37.439Z',
  },
  applicationId: 0,
  confirmationStatus: ApplicationConfirmationStatusInDto.FINAL_CONFIRM_ACCEPTED,
  createdAt: '2022-02-19T10:06:37.439Z',
  result: {
    interviewEndedAt: '2022-02-19T10:06:37.439Z',
    interviewStartedAt: '2022-02-19T10:06:37.439Z',
    status: ApplicationResultStatusInDto.INTERVIEW_FAILED,
  },
  team: {
    createdAt: '2022-02-19T10:06:37.439Z',
    createdBy: 'string',
    name: 'string',
    teamId: 0,
    updatedAt: '2022-02-19T10:06:37.439Z',
    updatedBy: 'string',
  },
  updatedAt: '2022-02-19T10:06:37.439Z',
  submittedAt: '2022-02-19T10:06:37.439Z',
};

export default {
  title: 'common/Sms Send Modal Dialog',
  component: SmsSendModalDialog,
} as ComponentMeta<typeof SmsSendModalDialog>;

const Template: ComponentStory<typeof SmsSendModalDialog> = (args: SmsSendModalDialogProps) => (
  <SmsSendModalDialog {...args} />
);

export const smsSendModalDialogNormal = Template.bind({});

smsSendModalDialogNormal.args = {
  selectedApplications: [mockApplication],
};

export const smsSendModalDialogWithResult = Template.bind({});

smsSendModalDialogWithResult.args = {
  selectedApplications: [mockApplication],
  showSummary: true,
};

export const smsSendModalDialogSendFailure = Template.bind({});

smsSendModalDialogSendFailure.args = {
  selectedApplications: [mockApplication],
  isSendFailed: true,
  messageContent: 'ABCD',
};
