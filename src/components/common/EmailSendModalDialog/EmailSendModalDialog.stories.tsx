import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmailSendModalDialog, { EmailSendModalDialogProps } from './EmailSendModalDialog.component';
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
  title: 'common/Email Send Modal Dialog',
  component: EmailSendModalDialog,
} as ComponentMeta<typeof EmailSendModalDialog>;

const Template: ComponentStory<typeof EmailSendModalDialog> = (args: EmailSendModalDialogProps) => (
  <EmailSendModalDialog {...args} />
);

export const emailSendModalDialogNormal = Template.bind({});

emailSendModalDialogNormal.args = {
  selectedApplications: [mockApplication],
};

export const emailSendModalDialogWithResult = Template.bind({});

emailSendModalDialogWithResult.args = {
  selectedApplications: [mockApplication],
  showSummary: true,
};

export const emailSendModalDialogSendFailure = Template.bind({});

emailSendModalDialogSendFailure.args = {
  selectedApplications: [mockApplication],
  isSendFailed: true,
};
