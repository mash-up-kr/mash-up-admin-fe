import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@/styles';
import { ValueOf } from '@/types';
import { ButtonSizeType, ButtonShapeType } from './Button.component';

interface StyledButtonProps {
  $size: ButtonSizeType;
  shape: ButtonShapeType;
}

export const ButtonWrapper = styled.button<StyledButtonProps>`
  ${({ theme, $size, shape }) =>
    css`
      ${theme.button.size[$size]}
      ${theme.button.shape[shape]}
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-style: solid;
      border-width: 0.1rem;
    `}
`;

export const spinner = keyframes`
  0% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<{ spinnerColor?: ValueOf<typeof colors> }>`
  ${({ theme }) => css`
    position: absolute;
    top: calc(50% - 1rem);
    left: calc(50% - 1rem);
    z-index: ${theme.zIndex.modal};
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    border: 0.4rem solid rgba(0, 0, 0, 0);
    border-top-color: ${theme.colors.whiteLoadingDimmed};
    border-radius: 50%;
    animation: ${spinner} 650ms linear infinite;
  `};
`;
