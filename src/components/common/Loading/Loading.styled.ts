import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ValueOf } from '@/types';
import { colors } from '@/styles';

export const LoadingWrapper = styled.div<{ dimmedColor: ValueOf<typeof colors> }>`
  ${({ theme, dimmedColor }) => css`
    position: absolute;
    z-index: ${theme.zIndex.modal};
    width: 100%;
    height: 100%;
    background-color: ${dimmedColor};
  `};
`;

export const spinner = keyframes`
  0% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<{ spinnerColor: ValueOf<typeof colors> }>`
  ${({ spinnerColor }) => css`
    position: absolute;
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
    width: 3.6rem;
    height: 3.6rem;
    margin: 0 auto;
    border: 0.4rem solid rgba(0, 0, 0, 0);
    border-top-color: ${spinnerColor};
    border-radius: 50%;
    animation: ${spinner} 650ms linear infinite;
  `};
`;
