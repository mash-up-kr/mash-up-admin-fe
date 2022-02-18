import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AlertModalDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 50vh;
  margin-top: 4rem;
  padding: 1.2rem 2.4rem;
`;

export const AlertModalDialogHeader = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bold24}
    max-width: 35.2rem;
    text-align: center;
  `}
`;

export const AlertModalDialogContent = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular16}
    max-width: 35.2rem;
    overflow-y: auto;
    white-space: pre-wrap;
  `}
`;
