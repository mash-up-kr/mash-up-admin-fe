import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateApplicationFormAside from './CreateApplicationFormAside.component';

export default {
  title: 'CreateApplicationFormAside',
  component: CreateApplicationFormAside,
} as ComponentMeta<typeof CreateApplicationFormAside>;

const Template: ComponentStory<typeof CreateApplicationFormAside> = () => (
  <CreateApplicationFormAside />
);

export const createApplicationFormAside = Template.bind({});
