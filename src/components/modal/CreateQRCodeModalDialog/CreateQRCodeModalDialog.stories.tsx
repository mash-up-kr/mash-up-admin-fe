import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateQRCodeModalDialog from './CreateQRCodeModalDialog.component';

export default {
  title: 'Modal/Create QR Code Modal Dialog',
  component: CreateQRCodeModalDialog,
} as ComponentMeta<typeof CreateQRCodeModalDialog>;

const Template: ComponentStory<typeof CreateQRCodeModalDialog> = () => (
  <CreateQRCodeModalDialog
    scheduleId={100038}
    eventId={100101}
    sessionStartedAt="2023-01-27T18:00"
    sessionEndedAt="2023-01-27T21:00"
  />
);

export const createQRCodeModalDialog = Template.bind({});
