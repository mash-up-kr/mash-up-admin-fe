import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label, {
  ApplicationConfirmationStatus,
  ApplicationResultStatus,
  LabelProps,
} from './Label.component';

export default {
  title: 'Label',
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args: LabelProps) => {
  return <Label {...args} />;
};

export const NOT_RATED = Template.bind({});
NOT_RATED.args = {
  type: ApplicationResultStatus.NOT_RATED,
};

export const SCREENING_TBD = Template.bind({});
SCREENING_TBD.args = {
  type: ApplicationResultStatus.SCREENING_TBD,
};

export const SCREENING_FAILED = Template.bind({});
SCREENING_FAILED.args = {
  type: ApplicationResultStatus.SCREENING_FAILED,
};

export const SCREENING_PASSED = Template.bind({});
SCREENING_PASSED.args = {
  type: ApplicationResultStatus.SCREENING_PASSED,
};

export const INTERVIEW_FAILED = Template.bind({});
INTERVIEW_FAILED.args = {
  type: ApplicationResultStatus.INTERVIEW_FAILED,
};

export const INTERVIEW_PASSED = Template.bind({});
INTERVIEW_PASSED.args = {
  type: ApplicationResultStatus.INTERVIEW_PASSED,
};

export const NOT_APPLICABLE = Template.bind({});
NOT_APPLICABLE.args = {
  type: ApplicationConfirmationStatus.NOT_APPLICABLE,
};

export const INTERVIEW_CONFIRM_WAITING = Template.bind({});
INTERVIEW_CONFIRM_WAITING.args = {
  type: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_WAITING,
};

export const INTERVIEW_CONFIRM_ACCEPTED = Template.bind({});
INTERVIEW_CONFIRM_ACCEPTED.args = {
  type: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_ACCEPTED,
};

export const INTERVIEW_CONFIRM_REJECTED = Template.bind({});
INTERVIEW_CONFIRM_REJECTED.args = {
  type: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_REJECTED,
};

export const FINAL_CONFIRM_WAITING = Template.bind({});
FINAL_CONFIRM_WAITING.args = {
  type: ApplicationConfirmationStatus.FINAL_CONFIRM_WAITING,
};

export const FINAL_CONFIRM_ACCEPTED = Template.bind({});
FINAL_CONFIRM_ACCEPTED.args = {
  type: ApplicationConfirmationStatus.FINAL_CONFIRM_ACCEPTED,
};

export const FINAL_CONFIRM_REJECTED = Template.bind({});
FINAL_CONFIRM_REJECTED.args = {
  type: ApplicationConfirmationStatus.FINAL_CONFIRM_REJECTED,
};
