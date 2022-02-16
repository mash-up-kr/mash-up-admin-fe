import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navigation, {
  NavigationSize,
  NavigationProps,
  NavigationItem,
} from './Navigation.component';
import { colors } from '@/styles';
import { PATH } from '@/constants';

export default {
  title: 'Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args: NavigationProps) => (
  <Navigation {...args} />
);

const items: NavigationItem[] = [
  {
    label: 'All',
    to: PATH.NOT_FOUND,
  },
];

export const navigation = Template.bind({});
navigation.args = { size: NavigationSize.sm, items, inActiveColor: colors.gray50 };
