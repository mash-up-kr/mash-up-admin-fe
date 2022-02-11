import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button, { ButtonSize, ButtonProps, ButtonShape } from './Button.component';
import OpenExternal from '@/assets/svg/open-external.svg';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const XSDefault = Template.bind({});
XSDefault.args = { $size: ButtonSize.xs, shape: ButtonShape.default, label: '제출하기' };

export const XSDefaultLine = Template.bind({});
XSDefaultLine.args = { $size: ButtonSize.xs, shape: ButtonShape.defaultLine, label: '제출하기' };

export const XSPrimary = Template.bind({});
XSPrimary.args = { $size: ButtonSize.xs, shape: ButtonShape.primary, label: '제출하기' };

export const XSPrimaryLine = Template.bind({});
XSPrimaryLine.args = { $size: ButtonSize.xs, shape: ButtonShape.primaryLine, label: '제출하기' };

export const SMDefault = Template.bind({});
SMDefault.args = { $size: ButtonSize.sm, shape: ButtonShape.default, label: '제출하기' };

export const SMDefaultLine = Template.bind({});
SMDefaultLine.args = { $size: ButtonSize.sm, shape: ButtonShape.defaultLine, label: '제출하기' };

export const SMPrimary = Template.bind({});
SMPrimary.args = { $size: ButtonSize.sm, shape: ButtonShape.primary, label: '제출하기' };

export const SMPrimaryLine = Template.bind({});
SMPrimaryLine.args = { $size: ButtonSize.sm, shape: ButtonShape.primaryLine, label: '제출하기' };

export const MDDefault = Template.bind({});
MDDefault.args = { $size: ButtonSize.md, shape: ButtonShape.default, label: '제출하기' };

export const MDDefaultLine = Template.bind({});
MDDefaultLine.args = { $size: ButtonSize.md, shape: ButtonShape.defaultLine, label: '제출하기' };

export const MDPrimary = Template.bind({});
MDPrimary.args = { $size: ButtonSize.md, shape: ButtonShape.primary, label: '제출하기' };

export const MDPrimaryLine = Template.bind({});
MDPrimaryLine.args = { $size: ButtonSize.md, shape: ButtonShape.primaryLine, label: '제출하기' };

export const LGDefault = Template.bind({});
LGDefault.args = { $size: ButtonSize.lg, shape: ButtonShape.default, label: '제출하기' };

export const LGDefaultLine = Template.bind({});
LGDefaultLine.args = { $size: ButtonSize.lg, shape: ButtonShape.defaultLine, label: '제출하기' };

export const LGPrimary = Template.bind({});
LGPrimary.args = { $size: ButtonSize.lg, shape: ButtonShape.primary, label: '제출하기' };

export const LGPrimaryLine = Template.bind({});
LGPrimaryLine.args = { $size: ButtonSize.lg, shape: ButtonShape.primaryLine, label: '제출하기' };

export const Icon = Template.bind({});
Icon.args = {
  shape: ButtonShape.icon,
  Icon: OpenExternal,
};

export const IconLabel = Template.bind({});
IconLabel.args = {
  shape: ButtonShape.defaultLine,
  Icon: OpenExternal,
  label: '제출하기',
};
