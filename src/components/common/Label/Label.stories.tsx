import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label, { ApplicationResultStatus, LabelProps } from './Label.component';

export default {
  title: 'Label',
} as ComponentMeta<typeof Label>;

export const Template: ComponentStory<typeof Label> = (args: LabelProps) => {
  return <Label {...args} />;
};

Template.args = {
  type: ApplicationResultStatus.NOT_RATED,
};
