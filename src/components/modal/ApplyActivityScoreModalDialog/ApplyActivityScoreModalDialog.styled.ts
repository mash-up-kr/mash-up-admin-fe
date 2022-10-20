import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { DatePickerField, ModalWrapper } from '@/components';

import { getScoreTextColor, RangeType } from '../../ActivityScore';
import { ValueOf } from '@/types';

export const ApplyActivityScoreModalWrapper = styled(ModalWrapper)`
  width: 100rem;
`;

export const ModalInner = styled.div`
  display: flex;
  flex: 1;
  padding: 0 2.4rem;
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    width: 0.1rem;
    margin: 0 2.4rem 0 0;
    background-color: ${theme.colors.gray20};
  `}
`;

export const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 35.2rem;
`;

export const ScoreSectionLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium15};

    display: flex;
    flex: 1;
    gap: 0.6rem;
    align-items: center;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const ScoreTypeList = styled.ul`
  padding-right: 2.6rem;
  overflow-y: auto;
`;

export const InputSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2.4rem;
`;

export const StyledDatePickerField = styled(DatePickerField)`
  position: absolute;
`;

export const RequiredDot = styled.span`
  ${({ theme }) => css`
    width: 0.6rem;
    height: 0.6rem;
    background-color: ${theme.colors.red50};
    border-radius: 50%;
  `}
`;

export const Label = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    display: block;
    color: ${theme.colors.gray70};
  `}
`;

export const RadioButtonGroup = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin: 1.6rem 0;
`;

export const RadioButtonGroupItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    ${({ theme }) => css`
      ${theme.fonts.medium16}
    `}
  }
`;

export const ScoreText = styled.span<{ rangeType: ValueOf<typeof RangeType> }>`
  ${({ theme, rangeType }) => css`
    ${theme.fonts.medium16};
    ${getScoreTextColor(rangeType, theme)};
  `}
`;
