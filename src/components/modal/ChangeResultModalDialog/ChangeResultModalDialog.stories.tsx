import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChangeResultModalDialog, {
  ChangeResultModalDialogProps,
} from './ChangeResultModalDialog.component';

export default {
  title: 'Modal/Change Result Modal Dialog',
  component: ChangeResultModalDialog,
} as ComponentMeta<typeof ChangeResultModalDialog>;

const Template: ComponentStory<typeof ChangeResultModalDialog> = (
  args: ChangeResultModalDialogProps,
) => <ChangeResultModalDialog {...args} />;

export const changeResultModalDialog = Template.bind({});

changeResultModalDialog.args = {
  selectedList: [0, 1, 2, 3, 4],
  selectedResults: ['SCREENING_PASSED', 'SCREENING_FAILED'],
};
