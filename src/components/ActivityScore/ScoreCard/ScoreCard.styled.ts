import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

export const Score = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bold46};

    color: ${theme.colors.green70};
  `}
`;
