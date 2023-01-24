import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InputSizeType } from './Input.component';

interface InputWrapperProps {
  fill?: boolean;
}

interface StyledInputWrapperProps {
  errorMessage?: string;
  fill?: boolean;
  disabled?: boolean;
}

interface StyledInputProps {
  $size: InputSizeType;
}

export const InputContainer = styled.div<InputWrapperProps>`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${({ fill }) => css`
    ${fill &&
    css`
      width: 100%;
    `}
  `}
`;

export const InputLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fonts.medium15}
    display: flex;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  width: 0.6rem;
  min-width: 0.6rem;
  height: 0.6rem;
  margin: 0.8rem 0 0 0.6rem;
  background-color: #eb6963;
  border-radius: 50%;
`;

export const Description = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular13};

    margin-bottom: 0.6rem;
    color: ${theme.colors.gray60};
  `}
`;

export const InputWrapper = styled.div<StyledInputWrapperProps>`
  ${({ theme, errorMessage, disabled }) => css`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 0.9rem;

    svg {
      margin-right: 1.2rem;
    }

    &:hover {
      border: 0.1rem solid ${theme.colors.purple40};
    }

    &:focus-within {
      border: 0.1rem solid ${theme.colors.purple70};
    }

    ${disabled
      ? css`
          background-color: ${theme.colors.gray5};
          border: 0.1rem solid ${theme.colors.gray30};
        `
      : ''}

    ${errorMessage
      ? css`
          && {
            border: 0.1rem solid ${theme.colors.red50};
          }
        `
      : ''}
  `}
`;

export const Input = styled.input<StyledInputProps>`
  ${({ theme, $size }) => css`
    ${theme.input.size[$size]};

    width: 100%;
    color: ${theme.colors.gray70};
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: ${theme.colors.gray50};
    }
  `}
`;

export const InputErrorMessage = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    margin-top: 0.6rem;
    color: ${theme.colors.red50};
  `}
`;
