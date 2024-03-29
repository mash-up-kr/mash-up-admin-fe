import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ModalWrapper } from '@/components';
import { KeyOf } from '@/types';
import { getScoreTextColor, RangeType } from '@/components/ActivityScore';

export const ActivityScoreModalWrapper = styled(ModalWrapper)`
  width: 50rem;
  max-width: 50rem;
`;

export const ModalInner = styled.div`
  padding: 1.2rem 2.4rem;
`;

export const DetailCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.4rem 2rem;
    background-color: ${theme.colors.gray5};
    border-radius: 2rem;
  `}
`;

export const ActivityTitle = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bold18};

    display: flex;
    gap: 0.8rem;
    align-items: center;
    margin-top: 1.6rem;
  `}
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    gap: 1.6rem;
    width: 100%;
    height: 0.1rem;
    margin: 2rem 0;
    background-color: ${theme.colors.gray20};
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

export const RowLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};

    width: 6.6rem;
    color: ${theme.colors.gray60};
    white-space: nowrap;
  `}
`;

export const RowContent = styled.span<{ isCanceled?: boolean }>`
  ${({ theme, isCanceled }) => css`
    ${theme.fonts.medium14};

    flex: 1;
    color: ${theme.colors.gray80};
    text-decoration: ${isCanceled ? 'line-through' : ''};
  `}
`;

export const ScoreRangeType = styled(RowContent)<{ type: KeyOf<typeof RangeType> }>`
  ${({ theme, type }) => css`
    ${getScoreTextColor(type, theme)};
  `}
`;

export const CancelLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium13};

    padding: 0.2rem 1rem;
    color: ${theme.colors.red70};
    background-color: ${theme.colors.red20};
    border-radius: 10rem;
  `}
`;
