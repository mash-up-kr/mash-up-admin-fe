import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header.component';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const header = Template.bind({});
