import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton.component';

export default {
  title: 'Toggle Button',
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args: ToggleButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => setToggle((prev) => !prev);

  return <ToggleButton {...args} isChecked={toggle} handleToggle={handleToggle} />;
};

export const toggleButton = Template.bind({});

toggleButton.args = {
  disabled: false,
};
