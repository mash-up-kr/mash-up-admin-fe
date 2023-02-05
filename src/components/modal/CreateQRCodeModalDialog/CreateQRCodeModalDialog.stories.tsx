import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateQRCodeModalDialog from './CreateQRCodeModalDialog.component';

export default {
  title: 'Modal/Create QR Code Modal Dialog',
  component: CreateQRCodeModalDialog,
} as ComponentMeta<typeof CreateQRCodeModalDialog>;

const Template: ComponentStory<typeof CreateQRCodeModalDialog> = () => <CreateQRCodeModalDialog />;

export const createQRCodeModalDialog = Template.bind({});
