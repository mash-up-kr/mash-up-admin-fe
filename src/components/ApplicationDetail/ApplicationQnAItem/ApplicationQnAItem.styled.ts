import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ApplicationQnAItemContainer = styled.div`
  ${({ theme }) => css`
    padding: 2.4rem;
    background-color: ${theme.colors.gray10};
    border-radius: 0.8rem;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bold18};
    color: ${theme.colors.gray80};
  `}
`;

export const Description = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular15};
    color: ${theme.colors.gray70};
  `}
`;

export const TextLength = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular15};
    width: 100%;
    margin-top: 1.2rem;
    padding-top: 1.2rem;
    color: ${theme.colors.gray70};
    text-align: right;
    border-top: 0.1rem solid ${theme.colors.gray30};

    & > strong {
      color: #5b4efd;
    }
  `}
`;
