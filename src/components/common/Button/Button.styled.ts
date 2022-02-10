import { css } from '@emotion/react';
import styled from '@emotion/styled';
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
      display: flex;
      align-items: center;
      justify-content: center;
      border-style: solid;
      border-width: 0.1rem;
    `}
`;
