import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DisplayQRCodeModalDialog from './DisplayQRCodeModalDialog.component';

export default {
  title: 'Modal/Display QR Code Modal Dialog',
  component: DisplayQRCodeModalDialog,
} as ComponentMeta<typeof DisplayQRCodeModalDialog>;

const Template: ComponentStory<typeof DisplayQRCodeModalDialog> = () => (
  <DisplayQRCodeModalDialog qrCodeUrl="https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=8ac39" />
);

export const displayQRCodeModalDialog = Template.bind({});
