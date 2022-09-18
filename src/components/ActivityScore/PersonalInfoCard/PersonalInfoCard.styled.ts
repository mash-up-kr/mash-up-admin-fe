import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray20};
    border-radius: 2rem;
  `}
`;

export const Headline = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.bold24};

    color: ${theme.colors.gray80};
  `}
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

export const Col = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};

    color: ${theme.colors.gray60};
  `}
`;

export const Content = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium16};

    color: ${theme.colors.gray80};
  `}
`;
