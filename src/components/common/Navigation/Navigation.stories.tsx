import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navigation, {
  NavigationSize,
  NavigationProps,
  NavigationItem,
} from './Navigation.component';
import { colors } from '@/styles';

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
    to: window.location.pathname,
  },
  {
    label: 'Design',
    to: '/design',
  },
  {
    label: 'Android',
    to: '/android',
  },
  {
    label: 'iOS',
    to: '/ios',
  },
  {
    label: 'Web',
    to: '/web',
  },
  {
    label: 'Node',
    to: '/node',
  },
  {
    label: 'Spring',
    to: '/spring',
  },
];

export const navigation = Template.bind({});
navigation.args = { size: NavigationSize.sm, items, inActiveColor: colors.gray50 };
