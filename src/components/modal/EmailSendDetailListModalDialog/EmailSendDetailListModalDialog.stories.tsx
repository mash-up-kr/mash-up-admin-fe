import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmailSendDetailListModalDialog from './EmailSendDetailListModalDialog.component';

export default {
  title: 'Modal/Email Send Detail List Modal Dialog',
  component: EmailSendDetailListModalDialog,
} as ComponentMeta<typeof EmailSendDetailListModalDialog>;

const Template: ComponentStory<typeof EmailSendDetailListModalDialog> = () => (
  <EmailSendDetailListModalDialog selectedApplications={[]} />
);

export const emailSendDetailListModalDialog = Template.bind({});
