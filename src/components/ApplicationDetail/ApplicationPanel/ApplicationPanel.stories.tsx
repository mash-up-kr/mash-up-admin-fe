import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationPanel, { ApplicationPanelProps } from './ApplicationPanel.component';
import {
  ApplicationConfirmationStatus,
  ApplicationResultStatus,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';

export default {
  title: 'ApplicationDetail/ApplicationPanel',
  component: ApplicationPanel,
} as ComponentMeta<typeof ApplicationPanel>;

const Template: ComponentStory<typeof ApplicationPanel> = (args: ApplicationPanelProps) => (
  <ApplicationPanel {...args} />
);

export const applicationPanel = Template.bind({});

applicationPanel.args = {
  confirmationStatus: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_REJECTED,
  resultStatus: ApplicationResultStatus.SCREENING_PASSED,
  interviewDate: '2022-02-19T05:43:38.517Z',
};
