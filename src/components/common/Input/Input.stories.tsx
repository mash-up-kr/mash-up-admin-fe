import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input, { InputSize, InputProps } from './Input.component';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => <Input {...args} />;

export const XS = Template.bind({});
XS.args = { $size: InputSize.xs, placeholder: '내용을 입력해주세요', label: '이메일' };

export const SM = Template.bind({});
SM.args = { $size: InputSize.sm, placeholder: '내용을 입력해주세요', label: '이메일' };

export const MD = Template.bind({});
MD.args = { $size: InputSize.md, placeholder: '내용을 입력해주세요', label: '이메일' };

export const Disabled = Template.bind({});
Disabled.args = {
  $size: InputSize.md,
  placeholder: '내용을 입력해주세요',
  disabled: true,
  label: '이메일',
};

export const Required = Template.bind({});
Required.args = {
  $size: InputSize.md,
  placeholder: '내용을 입력해주세요',
  label: '이메일',
  required: true,
};
