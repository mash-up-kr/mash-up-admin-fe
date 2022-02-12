import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton.component';

export default {
  title: 'ToggleButton',
} as ComponentMeta<typeof ToggleButton>;

export const Template: ComponentStory<typeof ToggleButton> = (args: ToggleButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => setToggle((prev) => !prev);

  return <ToggleButton {...args} isChecked={toggle} handleToggle={handleToggle} />;
};

Template.args = {
  disabled: false,
};
