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

export const applicationPanel = Template.bind({});

applicationPanel.args = {
  confirmationStatus: 'TBD',
  resultStatus: 'NOT_RATED',
  interviewDate: '2022-02-19T05:43:38.517Z',
};
