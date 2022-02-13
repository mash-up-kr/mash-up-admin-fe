import React from 'react';
import { ValueOf } from '@/types';
import * as Styled from './Label.styled';
import { colors } from '@/styles';

export const ApplicationResultStatus = {
  NOT_RATED: { label: '미겸토', backgroundColor: colors.gray20, color: colors.gray60 },
  SCREENING_TBD: { label: '서류 보류', backgroundColor: colors.blue20, color: colors.blue70 },
  SCREENING_FAILED: { label: '서류 불합격', backgroundColor: colors.orange70, color: colors.white },
  SCREENING_PASSED: { label: '서류 합격', backgroundColor: colors.blue70, color: colors.white },
  INTERVIEW_FAILED: { label: '최종 불합격', backgroundColor: colors.red70, color: colors.white },
  INTERVIEW_PASSED: { label: '최종 합격', backgroundColor: colors.green70, color: colors.white },
} as const;

export const ApplicationConfirmationStatus = {
  TBD: { label: '미겸토', backgroundColor: colors.gray20, color: colors.gray60 },
  NOT_APPLICABLE: { label: '대상 없음', backgroundColor: colors.gray60, color: colors.white },
  INTERVIEW_CONFIRM_WAITING: {
    label: '면접 확인 대기',
    backgroundColor: colors.blue20,
    color: colors.blue70,
  },
  INTERVIEW_CONFIRM_ACCEPTED: {
    label: '면접 수락',
    backgroundColor: colors.blue70,
    color: colors.white,
  },
  INTERVIEW_CONFIRM_REJECTED: {
    label: '면접 거절',
    backgroundColor: colors.red20,
    color: colors.red70,
  },
  FINAL_CONFIRM_WAITING: {
    label: '최종 확인 대기',
    backgroundColor: colors.purple20,
    color: colors.purple70,
  },
  FINAL_CONFIRM_ACCEPTED: {
    label: '최종 합격',
    backgroundColor: colors.green70,
    color: colors.white,
  },
  FINAL_CONFIRM_REJECTED: {
    label: '최종 거절',
    backgroundColor: colors.red70,
    color: colors.white,
  },
} as const;

export type ApplicationResultStatusType = ValueOf<typeof ApplicationResultStatus>;
export type ApplicationConfirmationStatusType = ValueOf<typeof ApplicationConfirmationStatus>;

export interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  type: ApplicationResultStatusType | ApplicationConfirmationStatusType;
}

const Label = ({ type, ...resetProps }: LabelProps) => {
  return (
    <Styled.LabelWrapper backgroundColor={type.backgroundColor} color={type.color} {...resetProps}>
      {type.label}
    </Styled.LabelWrapper>
  );
};

export default Label;
