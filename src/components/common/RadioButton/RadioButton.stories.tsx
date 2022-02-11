import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RadioButton, { RadioButtonProps } from './RadioButton.component';

export default {
  title: 'RadioButton',
} as ComponentMeta<typeof RadioButton>;

export const Template: ComponentStory<typeof RadioButton> = (args: RadioButtonProps) => {
  return <RadioButton {...args} />;
};

Template.args = {
  handleClickButton: () => {},
  disabled: false,
  defaultChecked: false,
  label: 'test',
};
