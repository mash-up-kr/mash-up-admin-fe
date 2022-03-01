import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationQnAItem from './ApplicationQnAItem.component';
import { Question } from '@/types';

export default {
  title: 'ApplicationDetail/Application Qn A Item',
  component: ApplicationQnAItem,
} as ComponentMeta<typeof ApplicationQnAItem>;

const Template: ComponentStory<typeof ApplicationQnAItem> = (args: Question) => (
  <ApplicationQnAItem {...args} />
);

export const applicationQnAItem = Template.bind({});

applicationQnAItem.args = {
  content: 'TEST',
  description: 'test',
  maxContentLength: 300,
  questionId: '0',
  required: false,
};
