import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const URLInputLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium15}

    display: flex;
    gap: 0.6rem;
    align-items: center;
    margin: 0 0 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  ${({ theme }) => css`
    width: 0.6rem;
    height: 0.6rem;
    background-color: ${theme.colors.red50};
    border-radius: 50%;
  `}
`;

export const Wrapper = styled.div`
  padding: 0 2.4rem 2.4rem 2.4rem;
`;
