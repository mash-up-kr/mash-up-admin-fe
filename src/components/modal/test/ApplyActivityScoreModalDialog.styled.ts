import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { DatePickerField, ModalWrapper } from '@/components';

import { RangeType } from '../../ActivityScore';
import { ValueOf } from '@/types';

const getScoreTextStyle = (rangeType: ValueOf<typeof RangeType>, theme: Theme) => {
  if (rangeType === RangeType.Plus) {
    return css`
      color: ${theme.colors.blue70};
    `;
  }

  if (rangeType === RangeType.Minus) {
    return css`
      color: ${theme.colors.red70};
    `;
  }

  if (rangeType === RangeType.Normal) {
    return css`
      color: ${theme.colors.gray70};
    `;
  }
};

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
    margin: 0 2.4rem;
    background-color: ${theme.colors.gray20};
  `}
`;

export const ScoreSection = styled.div`
  width: 35.2rem;
`;

export const ScoreSectionLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium15};

    display: flex;
    gap: 0.6rem;
    align-items: center;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
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

export const RadioButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin: 1.6rem 0;
`;

export const RadioButtonGroupItem = styled.div`
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
    ${getScoreTextStyle(rangeType, theme)};
  `}
`;
