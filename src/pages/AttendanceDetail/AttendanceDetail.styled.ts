import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AttendanceDetailPage = styled.div`
  padding: 2rem 0;
`;

export const Headline = styled.h2`
  ${({ theme }) => css`
    margin-top: 1.2rem;
    color: ${theme.colors.gray80};
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  `}
`;

export const Row = styled.div`
  display: flex;
  gap: 1.6rem;
  height: 32.8rem;
  margin-top: 2.6rem;

  & > div {
    &:first-of-type {
      flex: 5.5;
    }

    &:last-of-type {
      flex: 4.5;
    }
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 1.6rem;
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray20};
    border-radius: 2rem;
  `}
`;

export const ContentHeader = styled.div`
  display: flex;
  gap: 0.4rem;

  h3 {
    ${({ theme }) => css`
      ${theme.fonts.bold24};

      margin-right: auto;
      color: ${theme.colors.gray80};
    `}
  }
`;

export const IconWrapper = styled.div`
  svg {
    vertical-align: middle;
  }
`;
