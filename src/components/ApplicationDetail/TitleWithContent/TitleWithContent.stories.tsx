import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TitleWithContent, { TitleWithContentProps } from './TitleWithContent.component';

export default {
  title: 'ApplicationDetail/Title With Content',
  component: TitleWithContent,
} as ComponentMeta<typeof TitleWithContent>;

const Template: ComponentStory<typeof TitleWithContent> = (args: TitleWithContentProps) => (
  <TitleWithContent {...args}>TEST TEST</TitleWithContent>
);

export const titleWithContent = Template.bind({});

titleWithContent.args = {
  title: 'TEST',
  isLineThrough: false,
  isActive: false,
};
