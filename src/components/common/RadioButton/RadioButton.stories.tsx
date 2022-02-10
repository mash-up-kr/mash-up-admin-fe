import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RadioButton, { RadioButtonProps } from './RadioButton.component';

export default {
  title: 'RadioButton',
} as ComponentMeta<typeof RadioButton>;

export const Template: ComponentStory<typeof RadioButton> = (args: RadioButtonProps) => {
  return <RadioButton {...args} handleClickButton={() => console.log('clicked')} />;
};

Template.args = {
  disabled: false,
  defaultChecked: false,
  label: 'test',
};
