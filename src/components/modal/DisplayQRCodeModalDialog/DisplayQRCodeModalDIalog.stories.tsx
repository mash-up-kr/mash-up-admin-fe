import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DisplayQRCodeModalDialog from './DisplayQRCodeModalDialog.component';

export default {
  title: 'Modal/Display QR Code Modal Dialog',
  component: DisplayQRCodeModalDialog,
} as ComponentMeta<typeof DisplayQRCodeModalDialog>;

const Template: ComponentStory<typeof DisplayQRCodeModalDialog> = () => (
  <DisplayQRCodeModalDialog />
);

export const displayQRCodeModalDialog = Template.bind({});
