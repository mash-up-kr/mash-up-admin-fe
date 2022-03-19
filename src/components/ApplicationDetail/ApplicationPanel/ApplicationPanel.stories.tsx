import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationPanel, { ApplicationPanelProps } from './ApplicationPanel.component';

export default {
  title: 'ApplicationDetail/Application Panel',
  component: ApplicationPanel,
} as ComponentMeta<typeof ApplicationPanel>;

const Template: ComponentStory<typeof ApplicationPanel> = (args: ApplicationPanelProps) => (
  <ApplicationPanel {...args} />
);

export const applicationPanelTBD = Template.bind({});

applicationPanelTBD.args = {
  confirmationStatus: 'TO_BE_DETERMINED',
  resultStatus: 'NOT_RATED',
  interviewDate: '2022-02-22T08:10:11+09:00',
};

export const 서류_불합격 = Template.bind({});

서류_불합격.args = {
  confirmationStatus: 'NOT_APPLICABLE',
  resultStatus: 'SCREENING_FAILED',
  interviewDate: '2022-02-22T08:10:11+09:00',
};

export const 서류_합격_면접_확인_대기 = Template.bind({});

서류_합격_면접_확인_대기.args = {
  confirmationStatus: 'INTERVIEW_CONFIRM_WAITING',
  resultStatus: 'SCREENING_PASSED',
  interviewDate: '2022-02-22T08:10:11+09:00',
};

export const 서류_합격_면접_수락 = Template.bind({});

서류_합격_면접_수락.args = {
  confirmationStatus: 'INTERVIEW_CONFIRM_ACCEPTED',
  resultStatus: 'SCREENING_PASSED',
  interviewDate: '2022-02-22T08:10:11+09:00',
};

export const 서류_합격_면접_거절 = Template.bind({});

서류_합격_면접_거절.args = {
  confirmationStatus: 'INTERVIEW_CONFIRM_REJECTED',
  resultStatus: 'SCREENING_PASSED',
  interviewDate: '2022-02-22T08:10:11+09:00',
};
