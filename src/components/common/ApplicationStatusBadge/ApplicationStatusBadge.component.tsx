import React from 'react';
import { KeyOf, ValueOf } from '@/types';
import * as Styled from './ApplicationStatusBadge.styled';

export const ApplicationConfirmationStatus = {
  TO_BE_DETERMINED: '미검토',
  NOT_APPLICABLE: '해당 없음',
  INTERVIEW_CONFIRM_WAITING: '면접 확인 대기',
  INTERVIEW_CONFIRM_ACCEPTED: '면접 수락',
  INTERVIEW_CONFIRM_REJECTED: '면접 거절',
  FINAL_CONFIRM_WAITING: '최종 확인 대기',
  FINAL_CONFIRM_ACCEPTED: '최종 수락',
  FINAL_CONFIRM_REJECTED: '최종 거절',
} as const;

export const ApplicationResultStatus = {
  NOT_RATED: '미검토',
  SCREENING_TO_BE_DETERMINED: '서류 보류',
  SCREENING_FAILED: '서류 불합격',
  SCREENING_PASSED: '서류 합격',
  INTERVIEW_FAILED: '최종 불합격',
  INTERVIEW_TO_BE_DETERMINED: '최종 보류',
  INTERVIEW_PASSED: '최종 합격',
} as const;

export type ApplicationConfirmationStatusType = ValueOf<typeof ApplicationConfirmationStatus>;
export type ApplicationConfirmationStatusKeyType = KeyOf<typeof ApplicationConfirmationStatus>;
export type ApplicationResultStatusType = ValueOf<typeof ApplicationResultStatus>;
export type ApplicationResultStatusKeyType = KeyOf<typeof ApplicationResultStatus>;

export interface ApplicationStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: ApplicationConfirmationStatusType | ApplicationResultStatusType;
}

const ApplicationStatusBadge = ({ text, ...resetProps }: ApplicationStatusBadgeProps) => {
  return (
    <Styled.ApplicationStatusBadgeWrapper text={text} {...resetProps}>
      {text}
    </Styled.ApplicationStatusBadgeWrapper>
  );
};

export default ApplicationStatusBadge;
