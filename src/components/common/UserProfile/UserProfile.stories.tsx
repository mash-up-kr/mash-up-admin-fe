import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserProfile, { Team, Role, UserProfileProps } from './UserProfile.component';

export default {
  title: 'UserProfile',
} as ComponentMeta<typeof UserProfile>;

export const Template: ComponentStory<typeof UserProfile> = (args: UserProfileProps) => {
  return <UserProfile {...args} />;
};

Template.args = {
  team: Team.mashUp,
  role: Role.leader,
};
