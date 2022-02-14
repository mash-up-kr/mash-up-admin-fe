import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RadioButton, { RadioButtonProps } from './RadioButton.component';

export default {
  title: 'Radio Button',
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args: RadioButtonProps) => {
  return <RadioButton {...args} />;
};

export const radioButton = Template.bind({});

radioButton.args = {
  handleClickButton: () => {},
  disabled: false,
  defaultChecked: false,
  label: 'test',
};
