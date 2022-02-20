import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const spinner = keyframes`
  0% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
    border: 0.4rem solid rgba(0, 0, 0, 0);
    border-top-color: ${theme.colors.purple60};
    border-radius: 50%;
    animation: ${spinner} 650ms linear infinite;
  `};
`;
