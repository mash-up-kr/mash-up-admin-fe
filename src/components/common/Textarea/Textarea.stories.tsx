import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Textarea, { TextareaProps } from './Textarea.component';

export default {
  title: 'Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args: TextareaProps) => <Textarea {...args} />;

export const textarea = Template.bind({});

textarea.args = {
  label: '지원서 내용입니다. 최소 200자 이내',
  required: true,
  placeholder: '내용을 입력해주세요',
};
