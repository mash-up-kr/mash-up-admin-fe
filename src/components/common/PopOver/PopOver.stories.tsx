import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopOver, { PopOverProps } from './PopOver.component';
import { UserProfile } from '..';
import { Role, Team } from '../UserProfile/UserProfile.component';

export default {
  title: 'Pop Over',
} as ComponentMeta<typeof PopOver>;

const Template: ComponentStory<typeof PopOver> = (args: PopOverProps) => {
  return (
    <PopOver {...args}>
      <UserProfile team={Team.mashUp} role={Role.leader} />
    </PopOver>
  );
};

export const popOver = Template.bind({});
