import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const DatePickerWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    justify-content: flex-start;
    width: 33.6rem;
    min-height: 30.4rem;
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 1.2rem;
  `}
`;

export const DatePickerHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
    padding: 0 1.2rem;
    border-bottom: 0.1rem solid ${theme.colors.gray30};

    & h2 {
      ${theme.fonts.bold24}

      cursor: default;
    }

    & svg {
      cursor: pointer;

      & path {
        stroke: ${theme.colors.gray60};
      }
    }
  `}
`;

export const DatePickerTable = styled.table`
  ${({ theme }) => css`
    ${theme.fonts.regular14}

    margin: -2.2rem -1.8rem;
    padding-top: 0.8rem;
    padding-bottom: 1.6rem;
    line-height: 0;
    border-collapse: separate;
    border-spacing: 2.2rem 1.8rem;

    & thead {
      cursor: default;
    }

    & thead tr th,
    & tbody tr td {
      width: 2.4rem;
      height: 2.4rem;
      text-align: center;
      vertical-align: middle;
      border-radius: 0.5rem;
    }
  `}
`;

interface StyledDataPickerTdProps {
  disabled?: boolean;
  today?: boolean;
  selected?: boolean;
}

export const DatePickerTd = styled.td<StyledDataPickerTdProps>`
  ${({ theme, disabled, today, selected }) => css`
    ${disabled
      ? css`
          color: ${theme.colors.gray50};
          pointer-events: none;
        `
      : css`
          cursor: pointer;
        `}

    ${today
      ? css`
          color: ${theme.colors.purple70};
          background-color: ${theme.colors.purple20};
        `
      : ''}

    ${selected
      ? css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.purple70};
        `
      : ''}
  `}
`;
