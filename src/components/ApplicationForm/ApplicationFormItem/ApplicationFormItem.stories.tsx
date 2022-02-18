import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationFormItem, { ApplicationFormItemProps } from './ApplicationFormItem.component';

export default {
  title: 'ApplicationFormItem',
  component: ApplicationFormItem,
} as ComponentMeta<typeof ApplicationFormItem>;

const Template: ComponentStory<typeof ApplicationFormItem> = (args: ApplicationFormItemProps) => (
  <ApplicationFormItem {...args} />
);

export const applicationFormItem = Template.bind({});

applicationFormItem.args = {
  index: 1,
};
