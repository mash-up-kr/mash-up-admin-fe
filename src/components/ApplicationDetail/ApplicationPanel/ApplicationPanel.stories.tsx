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
  confirmationStatus: 'TBD',
  resultStatus: 'NOT_RATED',
  interviewDate: '2022-02-19T05:43:38.517Z',
};

export const applicationPanelREJECTED = Template.bind({});

applicationPanelREJECTED.args = {
  confirmationStatus: 'INTERVIEW_CONFIRM_REJECTED',
  resultStatus: 'NOT_RATED',
  interviewDate: '2022-02-19T05:43:38.517Z',
};
