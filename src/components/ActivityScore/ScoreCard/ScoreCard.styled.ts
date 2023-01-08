import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { ValueOf } from '@/types';
import { RangeType } from '../constants';

const getScoreTextColor = (type: ValueOf<typeof RangeType>, theme: Theme) => {
  let textColor = '';

  if (type === RangeType.Normal) {
    textColor = theme.colors.gray50;
  }

  if (type === RangeType.Minus) {
    textColor = theme.colors.red70;
  }

  if (type === RangeType.Plus) {
    textColor = theme.colors.blue70;
  }

  return css`
    color: ${textColor};
  `;
};

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray20};
    border-radius: 2rem;
  `}
`;

export const Headline = styled.h4`
  ${({ theme }) => css`
    ${theme.fonts.bold24};

    color: ${theme.colors.gray80};
  `};
`;

export const Score = styled.span<{ type: ValueOf<typeof RangeType> }>`
  ${({ theme, type }) => css`
    ${theme.fonts.bold46};
    ${getScoreTextColor(type, theme)}
  `}
`;
