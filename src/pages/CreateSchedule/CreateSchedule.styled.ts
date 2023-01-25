import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CreateSchedulePage = styled.div`
  padding: 2rem 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

export const Headline = styled.h2`
  ${({ theme }) => css`
    margin: 1.4rem 0 2.6rem;
    color: ${theme.colors.gray80};
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  `}
`;
