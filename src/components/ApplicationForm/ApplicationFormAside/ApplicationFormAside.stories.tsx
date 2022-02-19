import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationFormAside from './ApplicationFormAside.component';

export default {
  title: 'ApplicationFormAside',
  component: ApplicationFormAside,
} as ComponentMeta<typeof ApplicationFormAside>;

const Template: ComponentStory<typeof ApplicationFormAside> = () => <ApplicationFormAside />;

export const applicationFormAside = Template.bind({});
