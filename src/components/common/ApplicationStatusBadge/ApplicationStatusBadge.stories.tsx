import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationResultStatus,
  ApplicationStatusBadgeProps,
} from './ApplicationStatusBadge.component';

export default {
  title: 'ApplicationStatusBadge',
} as ComponentMeta<typeof ApplicationStatusBadge>;

const Template: ComponentStory<typeof ApplicationStatusBadge> = (
  args: ApplicationStatusBadgeProps,
) => {
  return <ApplicationStatusBadge {...args} />;
};

export const NOT_RATED = Template.bind({});
NOT_RATED.args = {
  text: ApplicationResultStatus.NOT_RATED,
};

export const SCREENING_TO_BE_DETERMINED = Template.bind({});
SCREENING_TO_BE_DETERMINED.args = {
  text: ApplicationResultStatus.SCREENING_TO_BE_DETERMINED,
};

export const SCREENING_FAILED = Template.bind({});
SCREENING_FAILED.args = {
  text: ApplicationResultStatus.SCREENING_FAILED,
};

export const SCREENING_PASSED = Template.bind({});
SCREENING_PASSED.args = {
  text: ApplicationResultStatus.SCREENING_PASSED,
};

export const INTERVIEW_FAILED = Template.bind({});
INTERVIEW_FAILED.args = {
  text: ApplicationResultStatus.INTERVIEW_FAILED,
};

export const INTERVIEW_FAILEDINTERVIEW_TO_BE_DETERMINED = Template.bind({});
INTERVIEW_FAILEDINTERVIEW_TO_BE_DETERMINED.args = {
  text: ApplicationResultStatus.INTERVIEW_TO_BE_DETERMINED,
};

export const INTERVIEW_PASSED = Template.bind({});
INTERVIEW_PASSED.args = {
  text: ApplicationResultStatus.INTERVIEW_PASSED,
};

export const NOT_APPLICABLE = Template.bind({});
NOT_APPLICABLE.args = {
  text: ApplicationConfirmationStatus.NOT_APPLICABLE,
};

export const INTERVIEW_CONFIRM_WAITING = Template.bind({});
INTERVIEW_CONFIRM_WAITING.args = {
  text: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_WAITING,
};

export const INTERVIEW_CONFIRM_ACCEPTED = Template.bind({});
INTERVIEW_CONFIRM_ACCEPTED.args = {
  text: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_ACCEPTED,
};

export const INTERVIEW_CONFIRM_REJECTED = Template.bind({});
INTERVIEW_CONFIRM_REJECTED.args = {
  text: ApplicationConfirmationStatus.INTERVIEW_CONFIRM_REJECTED,
};

export const FINAL_CONFIRM_WAITING = Template.bind({});
FINAL_CONFIRM_WAITING.args = {
  text: ApplicationConfirmationStatus.FINAL_CONFIRM_WAITING,
};

export const FINAL_CONFIRM_ACCEPTED = Template.bind({});
FINAL_CONFIRM_ACCEPTED.args = {
  text: ApplicationConfirmationStatus.FINAL_CONFIRM_ACCEPTED,
};

export const FINAL_CONFIRM_REJECTED = Template.bind({});
FINAL_CONFIRM_REJECTED.args = {
  text: ApplicationConfirmationStatus.FINAL_CONFIRM_REJECTED,
};
