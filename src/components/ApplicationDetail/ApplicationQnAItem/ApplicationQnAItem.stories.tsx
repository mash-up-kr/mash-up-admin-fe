import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationQnAItem, { ApplicationQnAItemProps } from './ApplicationQnAItem.component';

export default {
  title: 'ApplicationDetail/Application Qn A Item',
  component: ApplicationQnAItem,
} as ComponentMeta<typeof ApplicationQnAItem>;

const Template: ComponentStory<typeof ApplicationQnAItem> = (args: ApplicationQnAItemProps) => (
  <ApplicationQnAItem {...args} />
);

export const applicationQnAItem = Template.bind({});

applicationQnAItem.args = {
  content: 'TEST',
  description: 'test',
  maxContentLength: 300,
  questionId: 0,
  required: false,
  answer: {
    answerId: 0,
    content: 'ㅎㅇㅎㅇㅎㅇㅎ',
    questionId: 0,
  },
};
