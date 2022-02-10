import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox.component';

export default {
  title: 'Checkbox',
} as ComponentMeta<typeof Checkbox>;

export const Template: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => setToggle((prev) => !prev);

  return <Checkbox {...args} isChecked={toggle} handleToggle={handleToggle} />;
};

Template.args = {
  disabled: false,
  label: 'test',
};
