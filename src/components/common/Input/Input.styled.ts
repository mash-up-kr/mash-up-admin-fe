import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InputSizeType } from './Input.component';

interface InputWrapperProps {
  fill?: boolean;
}

interface StyledInputProps {
  $size: InputSizeType;
  errorMessage?: string;
  fill?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
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
    align-items: center;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.6rem;
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

export const Input = styled.input<StyledInputProps>`
  ${({ theme, $size, errorMessage }) => css`
    ${theme.input.size[$size]};

    color: ${theme.colors.gray70};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 0.9rem;
    outline: none;

    &::placeholder {
      color: ${theme.colors.gray50};
    }

    &:hover {
      border: 0.1rem solid ${theme.colors.purple40};
    }

    &:focus {
      border: 0.1rem solid ${theme.colors.purple70};
    }

    &:disabled {
      background-color: ${theme.colors.gray5};
      border: 0.1rem solid ${theme.colors.gray30};
    }

    ${errorMessage
      ? css`
          && {
            border: 0.1rem solid ${theme.colors.red50};
          }
        `
      : ''}
  `}
`;

export const InputErrorMessage = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    margin-top: 0.6rem;
    color: ${theme.colors.red50};
  `}
`;
