import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledToggleButtonLabelProps {
  disabled: boolean;
}

export const ToggleButtonLabel = styled.label<StyledToggleButtonLabelProps>`
  ${({ disabled }) => css`
    ${disabled
      ? css`
          opacity: 0.5;
          pointer-events: none;
        `
      : ''} position: relative;
    display: inline-block;
    width: 4rem;
    height: 2.4rem;
  `}
`;

export const ToggleButtonInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

export const ToggleButtonSlider = styled.span`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f6f6f6;
    border-radius: 2.45rem;
    cursor: pointer;
    transition: 0.4s;

    &::before {
      position: absolute;
      bottom: 0.2rem;
      left: 0.2rem;
      width: 2rem;
      height: 2rem;
      background-color: ${theme.colors.gray40};
      border-radius: 50%;
      transition: 0.4s;
      content: '';
    }

    input:checked + & {
      background-color: ${theme.colors.purple70};
    }

    input:checked + &::before {
      background-color: ${theme.colors.white};
      transform: translateX(1.6rem);
    }
  `}
`;
