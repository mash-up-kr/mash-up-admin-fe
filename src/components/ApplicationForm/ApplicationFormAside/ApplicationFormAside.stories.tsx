import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationFormAside, { ApplicationFormAsideProps } from './ApplicationFormAside.component';

export default {
  title: 'ApplicationFormAside',
  component: ApplicationFormAside,
} as ComponentMeta<typeof ApplicationFormAside>;

const Template: ComponentStory<typeof ApplicationFormAside> = (args: ApplicationFormAsideProps) => (
  <ApplicationFormAside {...args} />
);

export const applicationFormAside = Template.bind({});

applicationFormAside.args = {
  platform: 'Design',
  leftActionButton: {
    text: '취소',
  },
  rightActionButton: {
    text: '저장',
  },
};
