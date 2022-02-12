import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BackButton, { BackButtonProps } from './BackButton.component';

export default {
  title: 'Back Button',
  component: BackButton,
} as ComponentMeta<typeof BackButton>;

export const backButton: ComponentStory<typeof BackButton> = (args: BackButtonProps) => (
  <div style={{ width: '100vh', height: '100vh', backgroundColor: '#F2F3F5' }}>
    <BackButton {...args} />
  </div>
);
